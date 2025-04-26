import React, { useState } from 'react';

const PatientClinicalDocuments = ({ patientData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingDocument, setIsAddingDocument] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'anamnesis', label: 'Anamnesis' },
    { id: 'examination', label: 'Exámenes' },
    { id: 'treatment', label: 'Tratamientos' },
    { id: 'consent', label: 'Consentimientos' }
  ];

  // Datos de ejemplo para documentos clínicos
  const documents = [
    {
      id: 1,
      type: 'anamnesis',
      title: 'Anamnesis Inicial',
      date: '2024-03-15',
      description: 'Historia clínica inicial del paciente',
      url: '/documents/anamnesis-1.pdf',
      thumbnail: '/thumbnails/anamnesis-1.png'
    },
    {
      id: 2,
      type: 'examination',
      title: 'Examen Periodontal',
      date: '2024-03-15',
      description: 'Evaluación periodontal completa',
      url: '/documents/exam-1.pdf',
      thumbnail: '/thumbnails/exam-1.png'
    },
    {
      id: 3,
      type: 'treatment',
      title: 'Plan de Tratamiento',
      date: '2024-03-15',
      description: 'Plan de tratamiento aprobado',
      url: '/documents/treatment-1.pdf',
      thumbnail: '/thumbnails/treatment-1.png'
    },
    {
      id: 4,
      type: 'consent',
      title: 'Consentimiento Informado',
      date: '2024-03-15',
      description: 'Consentimiento para tratamiento periodontal',
      url: '/documents/consent-1.pdf',
      thumbnail: '/thumbnails/consent-1.png'
    }
  ];

  const filteredDocuments = documents.filter(doc => 
    selectedCategory === 'all' || doc.type === selectedCategory
  );

  const renderDocumentCard = (document) => (
    <div
      key={document.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">
              {document.title}
            </h4>
            <p className="text-sm text-gray-500">
              {document.date}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {document.description}
            </p>
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
          <h3 className="text-lg font-semibold text-blue-600">Documentos Clínicos</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingDocument(true)}
          >
            Nuevo Documento
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Lista de documentos */}
        <div className="space-y-4">
          {filteredDocuments.map(renderDocumentCard)}
        </div>
      </div>

      {/* Modal para agregar documento */}
      {isAddingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nuevo Documento Clínico
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Documento
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="">Seleccionar tipo</option>
                  <option value="anamnesis">Anamnesis</option>
                  <option value="examination">Examen</option>
                  <option value="treatment">Tratamiento</option>
                  <option value="consent">Consentimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                  placeholder="Título del documento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300"
                  rows="3"
                  placeholder="Descripción del documento..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo
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
                  onClick={() => setIsAddingDocument(false)}
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

export default PatientClinicalDocuments; 