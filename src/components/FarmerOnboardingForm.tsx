import { useForm } from 'react-hook-form';
import { useStripe } from '@stripe/react-stripe-js';

type FarmDetails = {
  farmName: string;
  location: string;
  productTypes: string[];
  description: string;
  deliveryRadius: number;
};

export default function FarmerOnboardingForm() {
  const { register, handleSubmit, formState } = useForm<FarmDetails>();
  const stripe = useStripe();

  const onSubmit = async (data: FarmDetails) => {
    // Create Stripe Connect account
    const response = await fetch('/api/farmers/onboard', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    const { accountLink } = await response.json();
    await stripe?.redirectToCheckout({ sessionId: accountLink.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Farm Name
            <input
              {...register('farmName', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
          
          <LocationSearch 
            onSelect={(location) => setValue('location', location)}
          />
        </div>

        <div className="space-y-4">
          <ProductTypeSelector
            {...register('productTypes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          
          <label className="block text-sm font-medium text-gray-700">
            Delivery Radius (miles)
            <input
              type="number"
              {...register('deliveryRadius', { min: 5, max: 100 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Complete Onboarding
      </button>
    </form>
  );
} 