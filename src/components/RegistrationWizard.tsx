import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Stepper } from './Stepper';
import { BasicInfoForm } from './BasicInfoForm';
import { FarmOnboardingForm } from './FarmOnboardingForm';

interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  farmDetails?: FarmDetails;
}

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleBasicSubmit = (data: Omit<RegistrationData, 'farmDetails'>) => {
    setFormData(data);
    data.role === 'FARMER' ? setStep(2) : completeRegistration(data);
  };

  const handleFarmSubmit = (farmData: FarmDetails) => {
    completeRegistration({ ...formData, farmDetails: farmData });
  };

  const completeRegistration = async (fullData: RegistrationData) => {
    await register(fullData);
    if (fullData.role === 'FARMER') {
      await handleStripeOnboarding(fullData);
    }
    navigate('/dashboard');
  };
  
  return (
    <div className="space-y-8">
      <Stepper steps={['Account', 'Farm Details']} currentStep={step} />
      {step === 1 && <BasicInfoForm onSubmit={handleBasicSubmit} />}
      {step === 2 && <FarmOnboardingForm onSubmit={handleFarmSubmit} />}
    </div>
  );
} 