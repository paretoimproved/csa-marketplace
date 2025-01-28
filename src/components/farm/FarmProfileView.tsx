import { FarmProfile } from '../../types';

interface Props {
  profile: FarmProfile;
}

export const FarmProfileView = ({ profile }: Props) => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  return (
    <div className="bg-white rounded-lg border border-gray-100">
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="mt-1 text-sm text-gray-600">Farm Profile</p>
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500">About</h3>
            <p className="mt-2 text-sm text-gray-900">{profile.description}</p>
          </div>

          {profile.location && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location Details</h3>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-900">{profile.location.address}</span>
                </div>
                <div className="text-sm text-gray-900">{profile.location.city}</div>
                <div className="text-sm text-gray-900">{profile.location.state}</div>
                <div className="text-sm text-gray-900">{profile.location.zipCode}</div>
              </div>
            </div>
          )}

          {/* Crop Calendar Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Seasonal Availability
            </h3>
            <div className="grid grid-cols-12 gap-1 text-xs">
              {Array.from({ length: 12 }).map((_, index) => (
                <div 
                  key={index}
                  className={`p-2 text-center border ${
                    currentMonth === index + 1 
                      ? 'bg-green-50 border-green-200' 
                      : 'border-gray-100'
                  }`}
                >
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][index]}
                </div>
              ))}
              {profile.crops?.map(crop => (
                <div 
                  key={crop.name}
                  className="col-span-12 grid grid-cols-12 gap-1 mb-2"
                >
                  {Array.from({ length: 12 }).map((_, index) => {
                    const isHarvestMonth = index + 1 >= crop.startMonth && 
                                        index + 1 <= crop.endMonth;
                    return (
                      <div
                        key={index}
                        className={`h-8 relative ${
                          isHarvestMonth 
                            ? 'bg-green-100 border border-green-200' 
                            : 'bg-gray-50'
                        }`}
                        title={isHarvestMonth ? `${crop.name} (${crop.yieldEstimate}kg/week)` : ''}
                      >
                        {index + 1 === crop.harvestWeek && (
                          <div className="absolute inset-0 bg-green-500 opacity-75 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
