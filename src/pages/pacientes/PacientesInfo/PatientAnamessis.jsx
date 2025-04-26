import React, { useState } from 'react';

const PatientAnamnesis = ({ patientData }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  const sections = [
    { id: 'general', label: 'Información General' },
    { id: 'habits', label: 'Hábitos' },
    { id: 'family', label: 'Historia Familiar' },
    { id: 'dental', label: 'Historia Dental' },
    { id: 'social', label: 'Aspectos Sociales' }
  ];

  // Datos de ejemplo para la anamnesis
  const anamnesisData = {
    general: {
      occupation: 'Ingeniero',
      maritalStatus: 'Casado',
      bloodType: 'O+',
      height: '175 cm',
      weight: '75 kg',
      allergies: ['Penicilina', 'Polen'],
      chronicDiseases: ['Diabetes Tipo 2'],
      medications: ['Metformina 500mg', 'Insulina']
    },
    habits: {
      smoking: 'No fuma',
      alcohol: 'Consumo ocasional',
      diet: 'Dieta balanceada',
      exercise: 'Ejercicio regular 3 veces por semana',
      sleep: '7-8 horas por noche',
      stress: 'Niveles moderados de estrés'
    },
    family: {
      father: 'Hipertensión',
      mother: 'Diabetes Tipo 2',
      siblings: 'Hermano mayor - Asma',
      children: 'Sin hijos',
      geneticConditions: 'No reportadas'
    },
    dental: {
      lastVisit: '2023-12-15',
      previousTreatments: [
        'Ortodoncia 2015-2017',
        'Extracción de muelas del juicio 2018'
      ],
      painHistory: 'Dolor ocasional en muela 26',
      brushingFrequency: '3 veces al día',
      flossingFrequency: '1 vez al día',
      mouthwash: 'Uso diario de enjuague con flúor'
    },
    social: {
      occupation: 'Ingeniero de Software',
      workSchedule: 'Lunes a Viernes 9am-6pm',
      hobbies: ['Lectura', 'Ciclismo'],
      supportSystem: 'Familiar cercano',
      insurance: 'Seguro dental privado',
      transportation: 'Vehículo propio'
    }
  };

  const renderSectionContent = (section) => {
    const data = anamnesisData[section];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            {Array.isArray(value) ? (
              <ul className="list-disc list-inside text-sm text-gray-600">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">{value}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Anamnesis</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsEditing(true)}
          >
            Editar Anamnesis
          </button>
        </div>

        {/* Navegación de secciones */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map(section => (
            <button
              key={section.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Contenido de la sección activa */}
        {renderSectionContent(activeSection)}
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Editar Anamnesis
            </h3>
            <form className="space-y-6">
              {sections.map(section => (
                <div key={section.id} className="space-y-4">
                  <h4 className="font-medium text-gray-900">{section.label}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(anamnesisData[section.id]).map(key => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        {Array.isArray(anamnesisData[section.id][key]) ? (
                          <textarea
                            className="w-full rounded-lg border-gray-300"
                            rows="3"
                            defaultValue={anamnesisData[section.id][key].join('\n')}
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full rounded-lg border-gray-300"
                            defaultValue={anamnesisData[section.id][key]}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-600"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAnamnesis; 