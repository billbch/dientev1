import React, { useState } from 'react';

const PatientRadiographs = ({ patientData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddingDocument, setIsAddingDocument] = useState(false);

  // Datos de ejemplo para las radiografías y documentos
  const documents = [
    {
      id: 1,
      type: 'radiograph',
      category: 'panoramic',
      title: 'Radiografía Panorámica',
      date: '2024-03-15',
      description: 'Radiografía panorámica inicial',
      url: '/path/to/panoramic.jpg',
      thumbnail: '/path/to/panoramic.jpg'
    },
    {
      id: 2,
      type: 'radiograph',
      category: 'periapical',
      title: 'Radiografía Periapical 16',
      date: '2024-03-15',
      description: 'Radiografía periapical del diente 16',
      url: '/path/to/periapical-16.jpg',
      thumbnail: '/path/to/periapical-16-thumb.jpg'
    },
    {
      id: 3,
      type: 'document',
      category: 'consent',
      title: 'Consentimiento Informado',
      date: '2024-03-10',
      description: 'Consentimiento para tratamiento periodontal',
      url: '/path/to/consent.pdf',
      thumbnail: '/path/to/pdf-icon.png'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'panoramic', label: 'Panorámicas' },
    { id: 'periapical', label: 'Periapicales' },
    { id: 'bitewing', label: 'Bitewing' },
    { id: 'document', label: 'Documentos' }
  ];

  const filteredDocuments = selectedCategory === 'all'
    ? documents
    : documents.filter(doc => doc.category === selectedCategory);

  const renderDocumentCard = (doc) => (
    <div
      key={doc.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={doc.thumbnail}
          alt={doc.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h4 className="font-medium text-gray-900 mb-1">{doc.title}</h4>
        <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{doc.date}</span>
          <div className="flex gap-2">
            <button
              className="btn-sm bg-blue-50 hover:bg-blue-100 text-blue-600"
              onClick={() => window.open(doc.url, '_blank')}
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
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Radiografías y Documentos</h3>
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingDocument(true)}
          >
            Agregar Documento
          </button>
        </div>

        {/* Filtros de categoría */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(renderDocumentCard)}
        </div>
      </div>

      {/* Modal para agregar documento */}
      {isAddingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Agregar Nuevo Documento
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Documento
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="radiograph">Radiografía</option>
                  <option value="document">Documento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="panoramic">Panorámica</option>
                  <option value="periapical">Periapical</option>
                  <option value="bitewing">Bitewing</option>
                  <option value="consent">Consentimiento</option>
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
                  placeholder="Ej: Radiografía Panorámica"
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
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Subir archivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF hasta 10MB
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

export default PatientRadiographs; 