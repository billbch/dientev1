import React, { useState } from 'react';

const PatientConsents = ({ patientData }) => {
  const [isAddingConsent, setIsAddingConsent] = useState(false);

  // Datos de ejemplo para consentimientos
  const consents = [
    {
      id: 1,
      title: 'Consentimiento para Tratamiento Periodontal',
      date: '2024-03-15',
      type: 'treatment',
      status: 'signed',
      signedBy: 'Juan Pérez',
      doctor: 'Dr. García',
      description: 'Consentimiento para realizar tratamiento periodontal completo',
      url: '/documents/consent-1.pdf'
    },
    {
      id: 2,
      title: 'Consentimiento para Radiografías',
      date: '2024-03-15',
      type: 'imaging',
      status: 'signed',
      signedBy: 'Juan Pérez',
      doctor: 'Dr. García',
      description: 'Autorización para realizar radiografías panorámicas y periapicales',
      url: '/documents/consent-2.pdf'
    },
    {
      id: 3,
      title: 'Consentimiento para Anestesia',
      date: '2024-03-15',
      type: 'procedure',
      status: 'signed',
      signedBy: 'Juan Pérez',
      doctor: 'Dr. García',
      description: 'Autorización para administrar anestesia local',
      url: '/documents/consent-3.pdf'
    }
  ];

  const renderConsentCard = (consent) => (
    <div
      key={consent.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {consent.title}
            </h4>
            <p className="text-sm text-gray-500">
              {consent.date}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {consent.description}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            consent.status === 'signed' 
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}>
            {consent.status === 'signed' ? 'Firmado' : 'Pendiente'}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            <span className="font-medium">Firmado por:</span> {consent.signedBy}
          </div>
          <div>
            <span className="font-medium">Doctor:</span> {consent.doctor}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn-sm bg-blue-50 hover:bg-blue-100 text-blue-600"
            onClick={() => {/* Implementar vista previa */}}
          >
            Ver
          </button>
          <button
            className="btn-sm bg-gray-50 hover:bg-gray-100 text-gray-600"
            onClick={() => {/* Implementar descarga */}}
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">
            Consentimientos
          </h3>
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingConsent(true)}
          >
            Nuevo Consentimiento
          </button>
        </div>

        <div className="space-y-4">
          {consents.map(renderConsentCard)}
        </div>
      </div>

      {/* Modal para agregar consentimiento */}
      {isAddingConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nuevo Consentimiento
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Consentimiento
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="">Seleccionar tipo</option>
                  <option value="treatment">Tratamiento</option>
                  <option value="imaging">Radiografías</option>
                  <option value="procedure">Procedimiento</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                  placeholder="Título del consentimiento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300"
                  rows="3"
                  placeholder="Descripción detallada del consentimiento..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documento
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Subir archivo</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF hasta 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-600"
                  onClick={() => setIsAddingConsent(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientConsents; 