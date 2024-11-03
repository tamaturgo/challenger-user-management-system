import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Acesso Não Autorizado</h2>
        <p className="text-center">Você não tem permissão para acessar esta página.</p>
        <a href="/" className="block mt-4 text-center text-indigo-600 underline">Voltar para a página de login</a>
      </div>
    </div>
  );
};

export default Unauthorized;
