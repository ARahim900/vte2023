import React from 'react';

const TestDeployment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Deployment Test Successful!</h1>
        <p className="text-gray-600 mb-4">
          This page confirms that GitHub updates are being deployed to Vercel.
        </p>
        <p className="text-sm text-gray-500">
          Created at: {new Date().toISOString()}
        </p>
        <div className="mt-6 space-y-2">
          <p className="text-lg font-semibold">Available Pages:</p>
          <ul className="text-left inline-block">
            <li>✓ / (Home)</li>
            <li>✓ /rf-age (R.F. Age Analysis)</li>
            <li>✓ /test-deployment (This page)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestDeployment;