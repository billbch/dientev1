import React, { useState } from 'react';

const PatientDentalHistory = ({ patientData }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para el formulario del historial médico dental
  const [consultationReason, setConsultationReason] = useState('');
  const [hasPain, setHasPain] = useState(false);
  const [painIntensity, setPainIntensity] = useState('');
  const [painType, setPainType] = useState('');
  const [painDuration, setPainDuration] = useState('');
  const [painLocation, setPainLocation] = useState('');
  const [sensitivityToCold, setSensitivityToCold] = useState(false);
  const [sensitivityToHeat, setSensitivityToHeat] = useState(false);
  const [sensitivityToTouch, setSensitivityToTouch] = useState(false);
  const [painOccurrence, setPainOccurrence] = useState('');
  const [isTakingMedication, setIsTakingMedication] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState('');
  const [medicationStartDate, setMedicationStartDate] = useState('');
  const [hasTrauma, setHasTrauma] = useState(false);
  const [traumaDetails, setTraumaDetails] = useState('');
  const [hasSpeechDifficulty, setHasSpeechDifficulty] = useState(false);
  const [hasMouthOpeningDifficulty, setHasMouthOpeningDifficulty] = useState(false);
  const [hasChewingDifficulty, setHasChewingDifficulty] = useState(false);
  const [hasPus, setHasPus] = useState(false);
  const [pusLocation, setPusLocation] = useState('');

  // Lista de historiales médicos dentales
  const [dentalHistories, setDentalHistories] = useState([
    {
      id: 1,
      date: '2024-03-15',
      reason: 'Dolor en molar inferior derecho',
      hasPain: true,
      painDetails: {
        intensity: 'Moderado',
        type: 'Intermitente',
        duration: '3 días',
        location: 'Molar inferior derecho',
        sensitivity: {
          cold: true,
          heat: true,
          touch: false
        },
        occurrence: 'Provocado',
        medication: {
          isTaking: true,
          details: 'Ibuprofeno 400mg',
          startDate: '2024-03-01'
        },
        trauma: {
          hasTrauma: false,
          details: ''
        },
        difficulties: {
          speech: false,
          mouthOpening: false,
          chewing: true
        },
        pus: {
          hasPus: false,
          location: ''
        }
      }
    }
  ]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Resetear todos los estados del formulario
    setConsultationReason('');
    setHasPain(false);
    setPainIntensity('');
    setPainType('');
    setPainDuration('');
    setPainLocation('');
    setSensitivityToCold(false);
    setSensitivityToHeat(false);
    setSensitivityToTouch(false);
    setPainOccurrence('');
    setIsTakingMedication(false);
    setMedicationDetails('');
    setMedicationStartDate('');
    setHasTrauma(false);
    setTraumaDetails('');
    setHasSpeechDifficulty(false);
    setHasMouthOpeningDifficulty(false);
    setHasChewingDifficulty(false);
    setHasPus(false);
    setPusLocation('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHistory = {
      id: dentalHistories.length + 1,
      date: new Date().toISOString().split('T')[0],
      reason: consultationReason,
      hasPain,
      painDetails: {
        intensity: painIntensity,
        type: painType,
        duration: painDuration,
        location: painLocation,
        sensitivity: {
          cold: sensitivityToCold,
          heat: sensitivityToHeat,
          touch: sensitivityToTouch
        },
        occurrence: painOccurrence,
        medication: {
          isTaking: isTakingMedication,
          details: medicationDetails,
          startDate: medicationStartDate
        },
        trauma: {
          hasTrauma,
          details: traumaDetails
        },
        difficulties: {
          speech: hasSpeechDifficulty,
          mouthOpening: hasMouthOpeningDifficulty,
          chewing: hasChewingDifficulty
        },
        pus: {
          hasPus,
          location: pusLocation
        }
      }
    };

    setDentalHistories([...dentalHistories, newHistory]);
    handleCloseModal();
  };

  const renderDentalHistoryForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Motivo de la Consulta</label>
        <textarea
          value={consultationReason}
          onChange={(e) => setConsultationReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={hasPain}
            onChange={(e) => setHasPain(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">¿Presenta dolor?</label>
        </div>

        {hasPain && (
          <div className="pl-6 space-y-4 border-l-2 border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700">Intensidad del Dolor</label>
              <select
                value={painIntensity}
                onChange={(e) => setPainIntensity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar intensidad</option>
                <option value="Leve">Leve</option>
                <option value="Moderado">Moderado</option>
                <option value="Intenso">Intenso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Dolor</label>
              <select
                value={painType}
                onChange={(e) => setPainType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar tipo</option>
                <option value="Temporal">Temporal</option>
                <option value="Intermitente">Intermitente</option>
                <option value="Continuo">Continuo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duración</label>
              <input
                type="text"
                value={painDuration}
                onChange={(e) => setPainDuration(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: 3 días, 2 semanas..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ubicación del Dolor</label>
              <input
                type="text"
                value={painLocation}
                onChange={(e) => setPainLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sensibilidad</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sensitivityToCold}
                    onChange={(e) => setSensitivityToCold(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Al frío</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sensitivityToHeat}
                    onChange={(e) => setSensitivityToHeat(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Al calor</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sensitivityToTouch}
                    onChange={(e) => setSensitivityToTouch(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Al tacto</label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">¿Cómo ocurre el dolor?</label>
              <select
                value={painOccurrence}
                onChange={(e) => setPainOccurrence(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Espontáneo">Espontáneo</option>
                <option value="Provocado">Provocado</option>
              </select>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isTakingMedication}
              onChange={(e) => setIsTakingMedication(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Está tomando medicamentos?</label>
          </div>
          {isTakingMedication && (
            <div className="pl-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicamentos</label>
                <input
                  type="text"
                  value={medicationDetails}
                  onChange={(e) => setMedicationDetails(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Especifique los medicamentos"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input
                  type="date"
                  value={medicationStartDate}
                  onChange={(e) => setMedicationStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasTrauma}
              onChange={(e) => setHasTrauma(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Sufrió algún golpe?</label>
          </div>
          {hasTrauma && (
            <div className="pl-6">
              <label className="block text-sm font-medium text-gray-700">Detalles del trauma</label>
              <textarea
                value={traumaDetails}
                onChange={(e) => setTraumaDetails(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Describa cómo y cuándo ocurrió el trauma"
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasSpeechDifficulty}
              onChange={(e) => setHasSpeechDifficulty(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Tiene dificultad para hablar?</label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasMouthOpeningDifficulty}
              onChange={(e) => setHasMouthOpeningDifficulty(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Tiene dificultad para abrir la boca?</label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasChewingDifficulty}
              onChange={(e) => setHasChewingDifficulty(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Tiene dificultad para masticar?</label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hasPus}
              onChange={(e) => setHasPus(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">¿Presenta pus?</label>
          </div>
          {hasPus && (
            <div className="pl-6">
              <label className="block text-sm font-medium text-gray-700">Ubicación del pus</label>
              <input
                type="text"
                value={pusLocation}
                onChange={(e) => setPusLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Especifique la ubicación"
                required
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Nuevo Historial Médico Dental</h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {renderDentalHistoryForm()}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDentalHistoryList = () => (
    <div className="space-y-4">
      {dentalHistories.map((history) => (
        <div key={history.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium text-gray-900">Fecha: {history.date}</h4>
              <p className="text-sm text-gray-600 mt-1">Motivo: {history.reason}</p>
            </div>
            <button
              onClick={() => {/* Implementar edición */}}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Editar
            </button>
          </div>

          {history.hasPain && (
            <div className="mt-4 space-y-2">
              <h5 className="font-medium text-gray-900">Dolor</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><span className="text-gray-600">Intensidad:</span> {history.painDetails.intensity}</p>
                <p><span className="text-gray-600">Tipo:</span> {history.painDetails.type}</p>
                <p><span className="text-gray-600">Duración:</span> {history.painDetails.duration}</p>
                <p><span className="text-gray-600">Ubicación:</span> {history.painDetails.location}</p>
                <p><span className="text-gray-600">Ocurrencia:</span> {history.painDetails.occurrence}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-600">Sensibilidad:</p>
                <div className="flex gap-4 mt-1">
                  {history.painDetails.sensitivity.cold && <span className="text-sm">Al frío</span>}
                  {history.painDetails.sensitivity.heat && <span className="text-sm">Al calor</span>}
                  {history.painDetails.sensitivity.touch && <span className="text-sm">Al tacto</span>}
                </div>
              </div>
            </div>
          )}

          {history.painDetails.medication.isTaking && (
            <div className="mt-4">
              <h5 className="font-medium text-gray-900">Medicamentos</h5>
              <p className="text-sm text-gray-600 mt-1">
                {history.painDetails.medication.details} (desde {history.painDetails.medication.startDate})
              </p>
            </div>
          )}

          {history.painDetails.trauma.hasTrauma && (
            <div className="mt-4">
              <h5 className="font-medium text-gray-900">Trauma</h5>
              <p className="text-sm text-gray-600 mt-1">{history.painDetails.trauma.details}</p>
            </div>
          )}

          <div className="mt-4">
            <h5 className="font-medium text-gray-900">Dificultades</h5>
            <div className="flex gap-4 mt-1">
              {history.painDetails.difficulties.speech && <span className="text-sm">Hablar</span>}
              {history.painDetails.difficulties.mouthOpening && <span className="text-sm">Abrir la boca</span>}
              {history.painDetails.difficulties.chewing && <span className="text-sm">Masticar</span>}
            </div>
          </div>

          {history.painDetails.pus.hasPus && (
            <div className="mt-4">
              <h5 className="font-medium text-gray-900">Pus</h5>
              <p className="text-sm text-gray-600 mt-1">Ubicación: {history.painDetails.pus.location}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderModal()}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Historial Médico Dental</h3>
          <button 
            onClick={handleOpenModal}
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
          >
            + Nuevo Historial
          </button>
        </div>

        {renderDentalHistoryList()}
      </div>
    </div>
  );
};

export default PatientDentalHistory; 