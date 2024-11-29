import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setError('Invalid verification link');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        {status === 'verifying' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <p className="mt-2">Please wait while we verify your email address.</p>
          </div>
        )}
        {status === 'success' && (
          <div className="text-center text-green-600">
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="mt-2">Your email has been verified. Redirecting to login...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center text-red-600">
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="mt-2">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};