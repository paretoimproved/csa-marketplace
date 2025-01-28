import { useState, useEffect } from 'react';
import { farmApi } from '../lib/api';
import { FarmProfile } from '../types';

export const useFarmProfile = (farmerId: string | undefined) => {
  const [profile, setProfile] = useState<FarmProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!farmerId) return;
    
    try {
      setLoading(true);
      const data = await farmApi.getFarmProfile(farmerId);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [farmerId]);

  return { profile, loading, error, refetchProfile: fetchProfile };
}; 