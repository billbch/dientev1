import React, { useState } from 'react';

const ToothDetails = ({ toothId, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('estado');

  const getToothData = (id) => ({
    numero: id,
    nombre: getToothName(id),
    estado: {
      movilidad: 0,
      sangrado: false,
      placa: false,
      dolor: false,
      sensibilidad: {
        frio: false,
        calor: false,
        dulce: false,
        presion: false
      }
    },
    mediciones: {
      profundidadSondaje: {
        vestibular: '2mm',
        palatino: '2mm',
        mesial: '2mm',
        distal: '2mm'
      },
      recesion: {
        vestibular: '0mm',
        palatino: '0mm',
        mesial: '0mm',
        distal: '0mm'
      },
      nivelInsercion: 'Normal'
    },
    hallazgos: []
  });

  const getToothName = (id) => {
    // Extraer el número y la letra del ID
    const cleanId = id.replace(/^0+/, ''); // Elimina los ceros iniciales
    const number = parseInt(cleanId);
    const quadrant = cleanId.slice(-1).toLowerCase();

    const names = {
      a: {
        1: 'Incisivo Central Superior Derecho',
        2: 'Incisivo Lateral Superior Derecho',
        3: 'Canino Superior Derecho',
        4: 'Primer Premolar Superior Derecho',
        5: 'Segundo Premolar Superior Derecho',
        6: 'Primer Molar Superior Derecho',
        7: 'Segundo Molar Superior Derecho',
        8: 'Tercer Molar Superior Derecho'
      },
      b: {
        1: 'Incisivo Central Superior Izquierdo',
        2: 'Incisivo Lateral Superior Izquierdo',
        3: 'Canino Superior Izquierdo',
        4: 'Primer Premolar Superior Izquierdo',
        5: 'Segundo Premolar Superior Izquierdo',
        6: 'Primer Molar Superior Izquierdo',
        7: 'Segundo Molar Superior Izquierdo',
        8: 'Tercer Molar Superior Izquierdo'
      },
      c: {
        1: 'Incisivo Central Inferior Izquierdo',
        2: 'Incisivo Lateral Inferior Izquierdo',
        3: 'Canino Inferior Izquierdo',
        4: 'Primer Premolar Inferior Izquierdo',
        5: 'Segundo Premolar Inferior Izquierdo',
        6: 'Primer Molar Inferior Izquierdo',
        7: 'Segundo Molar Inferior Izquierdo',
        8: 'Tercer Molar Inferior Izquierdo'
      },
      d: {
        1: 'Incisivo Central Inferior Derecho',
        2: 'Incisivo Lateral Inferior Derecho',
        3: 'Canino Inferior Derecho',
        4: 'Primer Premolar Inferior Derecho',
        5: 'Segundo Premolar Inferior Derecho',
        6: 'Primer Molar Inferior Derecho',
        7: 'Segundo Molar Inferior Derecho',
        8: 'Tercer Molar Inferior Derecho'
      }
    };

    return names[quadrant]?.[number] || 'Diente';
  };

  const tooth = getToothData(toothId);

  // Limpiar el ID del diente
  const cleanToothId = toothId.replace('Teeth_TeethMaterial_', '');

  const renderEstadoGeneral = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-3">Signos Vitales</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Movilidad</span>
              <span className="font-medium">Grado {tooth.estado.movilidad}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sangrado</span>
              <span className={`px-2 py-1 rounded text-xs ${tooth.estado.sangrado ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {tooth.estado.sangrado ? 'Presente' : 'Ausente'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Placa</span>
              <span className={`px-2 py-1 rounded text-xs ${tooth.estado.placa ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {tooth.estado.placa ? 'Presente' : 'Ausente'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-3">Sensibilidad</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(tooth.estado.sensibilidad).map(([tipo, presente]) => (
              <div key={tipo} className={`p-2 rounded text-center ${presente ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'}`}>
                <span className="text-sm capitalize">{tipo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-700 mb-3">Mediciones Periodontales</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Profundidad de Sondaje</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(tooth.mediciones.profundidadSondaje).map(([posicion, valor]) => (
                <div key={posicion} className="bg-blue-50 p-2 rounded text-center">
                  <span className="text-xs text-gray-500 capitalize">{posicion}</span>
                  <p className="font-medium text-blue-700">{valor}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Recesión</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(tooth.mediciones.recesion).map(([posicion, valor]) => (
                <div key={posicion} className="bg-purple-50 p-2 rounded text-center">
                  <span className="text-xs text-gray-500 capitalize">{posicion}</span>
                  <p className="font-medium text-purple-700">{valor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHallazgos = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Hallazgos Clínicos</h3>
        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100">
          + Nuevo Hallazgo
        </button>
      </div>
      
      {tooth.hallazgos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">No se han registrado hallazgos</p>
          <p className="text-sm text-gray-400">Registra el primer hallazgo clínico</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tooth.hallazgos.map((hallazgo, index) => (
            <div key={index} className="p-3 bg-white rounded-lg shadow">
              {hallazgo}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-800">{getToothName(cleanToothId)}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="px-6 py-2 bg-white border-b">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedSection('estado')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedSection === 'estado' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Estado General
          </button>
          <button
            onClick={() => setSelectedSection('hallazgos')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedSection === 'hallazgos' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Hallazgos
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {selectedSection === 'estado' ? renderEstadoGeneral() : renderHallazgos()}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-white border-t">
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Registrar Hallazgo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToothDetails; 