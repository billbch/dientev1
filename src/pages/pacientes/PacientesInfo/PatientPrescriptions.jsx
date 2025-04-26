import React, { useState } from 'react';

const PatientPrescriptions = ({ patientData }) => {
  const [isAddingPrescription, setIsAddingPrescription] = useState(false);

  // Datos de ejemplo para las prescripciones
  const prescriptions = [
    {
      id: 1,
      date: '2024-03-15',
      doctor: 'Dr. García',
      medications: [
        {
          name: 'Amoxicilina',
          dosage: '500mg',
          frequency: 'Cada 8 horas',
          duration: '7 días'
        },
        {
          name: 'Ibuprofeno',
          dosage: '400mg',
          frequency: 'Cada 6 horas',
          duration: '5 días'
        }
      ],
      instructions: 'Tomar con alimentos. Completar todo el tratamiento.',
      status: 'active'
    },
    {
      id: 2,
      date: '2024-02-20',
      doctor: 'Dra. Martínez',
      medications: [
        {
          name: 'Clorhexidina',
          dosage: '0.12%',
          frequency: '3 veces al día',
          duration: '14 días'
        }
      ],
      instructions: 'Enjuagar por 30 segundos después del cepillado.',
      status: 'completed'
    }
  ];

  const renderPrescriptionCard = (prescription) => (
    <div
      key={prescription.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-medium text-gray-900">
              Prescripción #{prescription.id}
            </h4>
            <p className="text-sm text-gray-500">
              {prescription.date} • {prescription.doctor}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              prescription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {prescription.status === 'active' ? 'Activa' : 'Completada'}
          </span>
        </div>

        <div className="space-y-3">
          {prescription.medications.map((medication, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {medication.name}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {medication.dosage}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {medication.duration}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {medication.frequency}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h5 className="text-sm font-medium text-gray-900 mb-1">
            Instrucciones
          </h5>
          <p className="text-sm text-gray-600">
            {prescription.instructions}
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn-sm bg-blue-50 hover:bg-blue-100 text-blue-600"
            onClick={() => {/* Implementar impresión */}}
          >
            Imprimir
          </button>
          <button
            className="btn-sm bg-gray-50 hover:bg-gray-100 text-gray-600"
            onClick={() => {/* Implementar descarga */}}
          >
            Descargar PDF
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
            Prescripciones
          </h3>
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingPrescription(true)}
          >
            Nueva Prescripción
          </button>
        </div>

        <div className="space-y-4">
          {prescriptions.map(renderPrescriptionCard)}
        </div>
      </div>

      {/* Modal para agregar prescripción */}
      {isAddingPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nueva Prescripción
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    Doctor
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300"
                    placeholder="Nombre del doctor"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamentos
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="rounded-lg border-gray-300"
                      placeholder="Nombre del medicamento"
                    />
                    <input
                      type="text"
                      className="rounded-lg border-gray-300"
                      placeholder="Dosis"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="rounded-lg border-gray-300"
                      placeholder="Frecuencia"
                    />
                    <input
                      type="text"
                      className="rounded-lg border-gray-300"
                      placeholder="Duración"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instrucciones
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300"
                  rows="3"
                  placeholder="Instrucciones para el paciente..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-600"
                  onClick={() => setIsAddingPrescription(false)}
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

export default PatientPrescriptions; 