import { useQuery } from '@tanstack/react-query';

export default function FarmerDashboard() {
  const { data: farmStats } = useQuery({
    queryKey: ['farmStats'],
    queryFn: () => fetch('/api/farmers/stats').then(res => res.json())
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Farm Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Active Subscribers"
            value={farmStats?.subscribers}
            trend={farmStats?.subscriberGrowth}
          />
          <StatCard
            title="Weekly Revenue"
            value={`$${farmStats?.revenue?.toLocaleString()}`}
            trend={farmStats?.revenueGrowth}
          />
          <StatCard
            title="Delivery Coverage"
            value={`${farmStats?.deliveryCoverage} mi`}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Performance</h2>
          <RevenueChart data={farmStats?.revenueData} />
        </div>
      </div>
    </div>
  );
} 