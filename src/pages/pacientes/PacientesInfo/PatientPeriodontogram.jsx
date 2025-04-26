import React, { useState } from 'react';

const PatientPeriodontogram = ({ patientData }) => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [isAddingMeasurement, setIsAddingMeasurement] = useState(false);

  // Datos de ejemplo para el periodontograma
  const teethData = {
    18: {
      measurements: ['2', '3', '2', '1', '1', '1'],
      mobility: 0,
      furcation: 0
    },
    17: {
      measurements: ['2', '2', '2', '1', '1', '1'],
      mobility: 0,
      furcation: 0
    }
  };

  const renderToothMeasurements = (number) => {
    const tooth = teethData[number];
    
    return (
      <div key={number} className="relative">
        {/* Celda del diente */}
        <div className="border border-dashed border-gray-300 w-20 h-24 relative">
          {/* Número del diente */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <span className="text-sm text-gray-600">{number}</span>
          </div>

          {tooth && (
            <>
              {/* Mediciones superiores */}
              <div className="absolute top-1 left-0 right-0 flex justify-around">
                {tooth.measurements.map((value, index) => (
                  <span key={index} className="text-xs text-gray-600">{value}</span>
                ))}
              </div>

              {/* Movilidad y Furcación */}
              <div className="absolute left-1 top-4 flex flex-col text-xs text-gray-600">
                <span>M: {tooth.mobility}</span>
                <span>F: {tooth.furcation}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-blue-600">Periodontograma</h3>
        <button 
          onClick={() => setIsAddingMeasurement(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Agregar Medición
        </button>
      </div>

      {/* Arco Superior */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Arco Superior</h4>
        <div className="flex flex-wrap justify-center">
          {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map(renderToothMeasurements)}
        </div>
      </div>

      {/* Arco Inferior */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Arco Inferior</h4>
        <div className="flex flex-wrap justify-center">
          {[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].map(renderToothMeasurements)}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Leyenda</h4>
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border border-gray-300 bg-white"></div>
            <span>Medidas en mm</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border border-gray-300 bg-green-50"></div>
            <span>Movilidad (0-3)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border border-gray-300 bg-purple-50"></div>
            <span>Furcación (0-3)</span>
          </div>
        </div>
      </div>

      {/* Modal para agregar medición */}
      {isAddingMeasurement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Agregar Medición
              </h3>
              <button
                onClick={() => setIsAddingMeasurement(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mediciones
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6].map((index) => (
                    <input
                      key={index}
                      type="number"
                      className="border rounded px-2 py-1 text-sm w-full"
                      placeholder={`Valor ${index}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Movilidad
                </label>
                <select className="w-full border rounded px-2 py-1 text-sm">
                  <option value="0">Grado 0</option>
                  <option value="1">Grado 1</option>
                  <option value="2">Grado 2</option>
                  <option value="3">Grado 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furcación
                </label>
                <select className="w-full border rounded px-2 py-1 text-sm">
                  <option value="0">Grado 0</option>
                  <option value="1">Grado 1</option>
                  <option value="2">Grado 2</option>
                  <option value="3">Grado 3</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsAddingMeasurement(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPeriodontogram; 