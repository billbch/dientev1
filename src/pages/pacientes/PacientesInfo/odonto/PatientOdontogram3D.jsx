// PatientOdontogram3D.jsx
import React from 'react';
import OdontogramScene from './OdontogramScene'; // Importa tu componente de escena 3D

const PatientOdontogram3D = ({ selectedTooth, setSelectedTooth }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">🦷</span>
        <h3 className="text-lg font-semibold text-blue-600">Odontograma 3D</h3>
      </div>
      <OdontogramScene selectedTooth={selectedTooth} setSelectedTooth={setSelectedTooth} />
    </div>
  );
};

export default PatientOdontogram3D;