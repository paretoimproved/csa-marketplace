import { Link, useSearchParams } from 'react-router-dom';

export const EmailVerificationError = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'Verification failed';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verification Failed
          </h2>
          <p className="mt-2 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        </div>
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};