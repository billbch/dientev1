import React, { useState } from 'react';

const PatientMedicalHistory = ({ patientData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'condition', label: 'Condiciones' },
    { id: 'allergy', label: 'Alergias' },
    { id: 'medication', label: 'Medicamentos' },
    { id: 'surgery', label: 'Cirugías' }
  ];

  // Datos de ejemplo para el historial médico
  const medicalHistory = [
    {
      id: 1,
      type: 'condition',
      title: 'Diabetes Tipo 2',
      date: '2020-05-15',
      doctor: 'Dr. Rodríguez',
      status: 'active',
      description: 'Diagnosticado en 2020. Controlado con medicación y dieta.',
      severity: 'moderate',
      notes: 'Requiere monitoreo regular de niveles de glucosa.'
    },
    {
      id: 2,
      type: 'allergy',
      title: 'Alergia a Penicilina',
      date: '2018-03-20',
      doctor: 'Dra. Martínez',
      status: 'active',
      description: 'Reacción alérgica severa a penicilina y derivados.',
      severity: 'severe',
      notes: 'Evitar cualquier medicamento que contenga penicilina.'
    },
    {
      id: 3,
      type: 'medication',
      title: 'Metformina',
      date: '2020-05-15',
      doctor: 'Dr. Rodríguez',
      status: 'active',
      description: 'Medicamento para control de diabetes.',
      dosage: '500mg dos veces al día',
      notes: 'Tomar con las comidas.'
    },
    {
      id: 4,
      type: 'surgery',
      title: 'Apendicectomía',
      date: '2015-08-10',
      doctor: 'Dr. García',
      status: 'completed',
      description: 'Cirugía laparoscópica de apendicitis.',
      severity: 'moderate',
      notes: 'Recuperación completa. Sin complicaciones.'
    }
  ];

  const filteredHistory = medicalHistory.filter(entry => 
    activeFilter === 'all' || entry.type === activeFilter
  );

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'resolved':
        return 'Resuelto';
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'condition':
        return 'Condición';
      case 'allergy':
        return 'Alergia';
      case 'medication':
        return 'Medicamento';
      case 'surgery':
        return 'Cirugía';
      default:
        return type;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'bg-yellow-100 text-yellow-800';
      case 'moderate':
        return 'bg-orange-100 text-orange-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'mild':
        return 'Leve';
      case 'moderate':
        return 'Moderado';
      case 'severe':
        return 'Severo';
      default:
        return severity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Historial Médico</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingEntry(true)}
          >
            Nueva Entrada
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Lista de entradas del historial */}
        <div className="space-y-4">
          {filteredHistory.map(entry => (
            <div
              key={entry.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {entry.title}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                      {getStatusLabel(entry.status)}
                    </span>
                    {entry.severity && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(entry.severity)}`}>
                        {getSeverityLabel(entry.severity)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">{entry.date}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{entry.doctor}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{getTypeLabel(entry.type)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-600">
                    Editar
                  </button>
                  <button className="btn-sm bg-white border border-gray-200 hover:bg-gray-50 text-gray-600">
                    Ver Detalles
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {entry.description}
              </p>

              {entry.dosage && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Dosis: {entry.dosage}</span>
                </div>
              )}

              {entry.notes && (
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{entry.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar entrada */}
      {isAddingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nueva Entrada al Historial
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Entrada
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="">Seleccionar tipo</option>
                  <option value="condition">Condición</option>
                  <option value="allergy">Alergia</option>
                  <option value="medication">Medicamento</option>
                  <option value="surgery">Cirugía</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                  placeholder="Ej: Diabetes Tipo 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300"
                  rows="3"
                  placeholder="Describe los detalles..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Severidad
                </label>
                <select className="w-full rounded-lg border-gray-300">
                  <option value="">Seleccionar severidad</option>
                  <option value="mild">Leve</option>
                  <option value="moderate">Moderado</option>
                  <option value="severe">Severo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300"
                  rows="2"
                  placeholder="Notas adicionales..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-600"
                  onClick={() => setIsAddingEntry(false)}
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

export default PatientMedicalHistory; 