import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FarmProfile as FarmProfileType } from '../types';
import { CreateFarmProfile } from '../components/farm/CreateFarmProfile';
import { FarmProfileView } from '../components/farm/FarmProfileView';

export const FarmDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FarmProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`http://localhost:3001/api/farms/farmer/${user.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch farm profile');
        }
        
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Farm Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user?.firstName}!</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="px-4 py-6 sm:px-0">
          {profile ? (
            <FarmProfileView profile={profile} />
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome to CSA Marketplace!
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Let's get started by setting up your farm profile.</p>
                </div>
                <div className="mt-5">
                  <CreateFarmProfile onProfileCreated={setProfile} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};