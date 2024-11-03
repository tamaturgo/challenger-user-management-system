import React from "react";

const Welcome: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Bem-vindo!</h2>
        <p className="text-center">Estamos felizes em tê-lo conosco. Aproveite sua experiência.</p>
      </div>
    </div>
  );
};

export default Welcome;
