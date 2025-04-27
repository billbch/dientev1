import React, { useState } from 'react';
import PatientOdontogram3D from './odonto/PatientOdontogram3D'
import PatientOdontogramImage from './odonto/PatientOdontogramImage';

const PatientOdontogram = () => {
  const [viewMode, setViewMode] = useState('3d');
  const [selectedTooth, setSelectedTooth] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-4 py-2 rounded ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ver Odontograma 3D
        </button>
        <button
          onClick={() => setViewMode('imagen')}
          className={`px-4 py-2 rounded ${viewMode === 'imagen' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ver Imagen Odontograma
        </button>
      </div>

      {viewMode === '3d' ? (
        <PatientOdontogram3D selectedTooth={selectedTooth} setSelectedTooth={setSelectedTooth} />
      ) : (
        <PatientOdontogramImage />
      )}
    </div>
  );
};

export default PatientOdontogram;
