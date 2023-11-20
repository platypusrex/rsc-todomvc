import React from 'react';

export const Loading: React.FC = () => (
  <main className="h-screen flex items-center justify-center bg-gray-100">
    <h1 className="animate-ping text-xl font-semibold text-gray-600">
      Loading todos...
    </h1>
  </main>
);
