import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FarmProfile } from '../../types';
import { Input } from '../common/Input';

interface Props {
  onProfileCreated: (profile: FarmProfile) => void;
}

export const CreateFarmProfile = ({ onProfileCreated }: Props) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    farmingMethod: 'ORGANIC',
    pickupOptions: ['FARM', 'MARKET'],
    availableProducts: ['VEGETABLES', 'FRUITS', 'EGGS']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, farmerId: user?.id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create farm profile');
      onProfileCreated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Input
          label="Farm Name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your farm's name"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Tell us about your farm..."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Street Address"
            required
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            placeholder="123 Farm Road"
          />
          
          <Input
            label="City"
            required
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="City"
          />
          
          <Input
            label="State"
            required
            value={formData.state}
            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            placeholder="State"
          />
          
          <Input
            label="ZIP Code"
            required
            pattern="[0-9]{5}"
            value={formData.zipCode}
            onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
            placeholder="12345"
          />
        </div>

        <select 
          className="w-full p-2 border rounded-md"
          value={formData.farmingMethod}
          onChange={(e) => setFormData({...formData, farmingMethod: e.target.value})}
        >
          <option value="ORGANIC">Certified Organic</option>
          <option value="SUSTAINABLE">Sustainable Farming</option>
          <option value="CONVENTIONAL">Conventional</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};