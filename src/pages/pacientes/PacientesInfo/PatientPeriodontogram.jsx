import React, { useState } from 'react';
import { motion } from 'framer-motion';
import periodontogramImage from '../../../images/periodontograma.jpg'; // Actualiza esta ruta a una imagen clara y de alta resolución

const PatientPeriodontogram = ({ patientData }) => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethMeasurements, setTeethMeasurements] = useState({});

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(toothNumber);
  };

  const handleInputChange = (toothNumber, field, value) => {
    setTeethMeasurements(prev => ({
      ...prev,
      [toothNumber]: {
        ...prev[toothNumber],
        [field]: value
      }
    }));
  };

  const teethNumbers = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-6xl">
          <img src={periodontogramImage} alt="Periodontograma" className="w-full object-cover" />
          {teethNumbers.map((number, index) => (
            <div
              key={number}
              style={{ position: 'absolute', top: `${Math.floor(index / 16) * 45 + 15}%`, left: `${(index % 16) * 6.25}%`, width: '5%', height: '8%' }}
              className="cursor-pointer bg-transparent hover:bg-blue-100"
              onClick={() => handleToothClick(number)}
            />
          ))}
        </div>
      </div>

      {selectedTooth && (
        <motion.div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Diente {selectedTooth}</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Profundidad', 'Sangrado', 'Placa', 'Furcación', 'Implante', 'Movilidad'].map((field) => (
              <div key={field}>
                <label className="text-sm font-medium text-gray-700 block mb-1">{field}</label>
                <input
                  type="text"
                  value={teethMeasurements[selectedTooth]?.[field] || ''}
                  onChange={(e) => handleInputChange(selectedTooth, field, e.target.value)}
                  className="border rounded px-2 py-1 w-full text-sm"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mt-8 text-gray-700 text-sm">
        <h4 className="font-semibold mb-2">Leyenda:</h4>
        <ul className="list-disc list-inside">
          <li><span className="text-blue-600">Azul:</span> Profundidad Normal</li>
          <li><span className="text-red-600">Rojo:</span> Sangrado o inflamación</li>
          <li><span className="text-yellow-600">Amarillo:</span> Presencia de Placa</li>
          <li><span className="text-purple-600">Morado:</span> Implantes</li>
          <li><span className="text-green-600">Verde:</span> Movilidad aumentada</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientPeriodontogram;
