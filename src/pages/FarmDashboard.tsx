import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FarmProfile as FarmProfileType } from '../types';
import { CreateFarmProfile } from '../components/farm/CreateFarmProfile';
import { FarmProfileView } from '../components/farm/FarmProfileView';
import { useFarmProfile } from '../hooks/useFarmProfile';
import { farmApi } from '../lib/api';
import { AppLayout } from '../components/layout/AppLayout';

export const FarmDashboard = () => {
  const { user } = useAuth();
  const { profile, loading, error, refetchProfile } = useFarmProfile(user?.id);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {error?.includes('404') ? (
          <div className="bg-white rounded-lg border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900">Welcome to CSA Marketplace</h2>
            <p className="mt-2 text-sm text-gray-600">Let's set up your farm profile to get started.</p>
            <CreateFarmProfile onProfileCreated={refetchProfile} />
          </div>
        ) : profile ? (
          <FarmProfileView profile={profile} />
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">🛒 Current Orders</h3>
            <div className="text-3xl font-bold text-emerald-600">24</div>
            <p className="text-sm text-gray-500">Active subscriptions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">📅 Next Delivery</h3>
            <div className="text-3xl font-bold text-amber-600">Sept 15</div>
            <p className="text-sm text-gray-500">Prepare harvest list</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">🌱 Inventory</h3>
            <div className="text-3xl font-bold text-rose-600">82%</div>
            <p className="text-sm text-gray-500">Weekly boxes remaining</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};