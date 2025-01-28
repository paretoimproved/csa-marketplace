export const Logo = ({ className = '' }) => (
  <svg 
    className={`h-8 w-8 ${className}`}
    viewBox="0 0 100 100" 
    fill="currentColor"
  >
    {/* Leaf/Plant shape */}
    <path d="M50 15 Q60 5 70 15 Q80 25 65 35 Q50 45 50 60 Q50 45 35 35 Q20 25 30 15 Q40 5 50 15 Z" />
    
    {/* Soil/dirt base */}
    <rect x="40" y="60" width="20" height="10" rx="2" />
    <rect x="35" y="70" width="30" height="5" rx="1" />
  </svg>
)

export const AnimatedLogo = () => (
  <div className="relative h-12 w-12">
    <div className="absolute inset-0 animate-spin-slow">
      <svg viewBox="0 0 100 100" className="h-full w-full text-green-500">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" 
          strokeDasharray="10 10" opacity="0.2" />
      </svg>
    </div>
    <Logo className="absolute inset-1 h-10 w-10 text-green-600" />
  </div>
) 