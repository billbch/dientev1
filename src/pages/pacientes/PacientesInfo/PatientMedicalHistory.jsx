import React, { useState } from 'react';

const PatientMedicalHistory = ({ patientData }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'disease', 'medication', 'allergy', 'surgery', 'hospitalization'
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseSeverity, setDiseaseSeverity] = useState('');
  const [diseaseDate, setDiseaseDate] = useState('');
  const [diseaseTreatment, setDiseaseTreatment] = useState('');
  const [diseaseNotes, setDiseaseNotes] = useState('');
  const [isUnderTreatment, setIsUnderTreatment] = useState(false);

  // Estados para cirugía
  const [surgeryType, setSurgeryType] = useState('');
  const [surgeryDate, setSurgeryDate] = useState('');
  const [surgeryHospital, setSurgeryHospital] = useState('');
  const [surgerySurgeon, setSurgerySurgeon] = useState('');
  const [surgeryNotes, setSurgeryNotes] = useState('');

  // Estados para hospitalización
  const [hospitalReason, setHospitalReason] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAdmissionDate, setHospitalAdmissionDate] = useState('');
  const [hospitalDischargeDate, setHospitalDischargeDate] = useState('');
  const [hospitalNotes, setHospitalNotes] = useState('');

  // Estados para hábitos
  const [habitType, setHabitType] = useState(''); // 'smoking', 'alcohol', 'drugs', 'other'
  const [smokingStatus, setSmokingStatus] = useState('');
  const [smokingYears, setSmokingYears] = useState('');
  const [smokingCigarettesPerDay, setSmokingCigarettesPerDay] = useState('');
  const [smokingQuitDate, setSmokingQuitDate] = useState('');
  const [smokingNotes, setSmokingNotes] = useState('');
  const [alcoholFrequency, setAlcoholFrequency] = useState('');
  const [alcoholAmount, setAlcoholAmount] = useState('');
  const [alcoholNotes, setAlcoholNotes] = useState('');
  const [drugType, setDrugType] = useState('');
  const [drugFrequency, setDrugFrequency] = useState('');
  const [drugNotes, setDrugNotes] = useState('');
  const [otherHabit, setOtherHabit] = useState('');
  const [otherHabitFrequency, setOtherHabitFrequency] = useState('');
  const [otherHabitAmount, setOtherHabitAmount] = useState('');
  const [otherHabitNotes, setOtherHabitNotes] = useState('');

  // Estados para gestación
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyDate, setPregnancyDate] = useState('');
  const [pregnancyClinic, setPregnancyClinic] = useState('');
  const [pregnancyNotes, setPregnancyNotes] = useState('');
  const [previousPregnancyDate, setPreviousPregnancyDate] = useState('');
  const [previousPregnancyClinic, setPreviousPregnancyClinic] = useState('');
  const [previousPregnancyOutcome, setPreviousPregnancyOutcome] = useState('');
  const [previousPregnancyNotes, setPreviousPregnancyNotes] = useState('');

  // Datos de ejemplo para el historial médico
  const medicalHistory = {
    general: {
      hasDiseases: true,
      diseases: [
        {
          name: 'Diabetes Tipo 2',
          severity: 'Moderado',
          diagnosisDate: '2020-05-15',
          isUnderTreatment: true,
          treatment: 'Metformina 500mg, dieta controlada',
          notes: 'Controlado con medicación y dieta'
        },
        {
          name: 'Hipertensión',
          severity: 'Leve',
          diagnosisDate: '2019-03-10',
          isUnderTreatment: true,
          treatment: 'Lisinopril 10mg',
          notes: 'Controlado con medicación'
        }
      ],
      hasMedications: true,
      medications: [
        {
          name: 'Metformina',
          dosage: '500mg',
          frequency: 'Dos veces al día',
          startDate: '2020-05-15',
          reason: 'Control de diabetes',
          notes: 'Tomar con las comidas'
        },
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Una vez al día',
          startDate: '2019-03-10',
          reason: 'Control de presión arterial',
          notes: 'Tomar en la mañana'
        }
      ],
      hasAllergies: true,
      allergies: [
        {
          substance: 'Penicilina',
          reaction: 'Erupción cutánea severa',
          severity: 'Alta',
          notes: 'Evitar cualquier medicamento que contenga penicilina'
        },
        {
          substance: 'Látex',
          reaction: 'Picazón y enrojecimiento',
          severity: 'Moderada',
          notes: 'Usar guantes sin látex'
        }
      ]
    },
    surgeries: {
      hasSurgeries: true,
      surgeries: [
        {
          type: 'Apendicectomía',
          date: '2015-08-10',
          hospital: 'Hospital General de Madrid',
          surgeon: 'Dr. García',
          notes: 'Cirugía laparoscópica, recuperación sin complicaciones'
        }
      ],
      hasHospitalizations: true,
      hospitalizations: [
        {
          reason: 'Apendicitis aguda',
          hospital: 'Hospital General de Madrid',
          admissionDate: '2015-08-09',
          dischargeDate: '2015-08-12',
          notes: 'Recuperación satisfactoria'
        }
      ]
    },
    habits: {
      hasSmoking: true,
      smoking: {
        status: 'Ex fumador',
        years: 10,
        cigarettesPerDay: 20,
        quitDate: '2020-01-15',
        notes: 'Dejó de fumar hace 4 años'
      },
      hasAlcohol: true,
      alcohol: {
        frequency: 'Ocasional',
        amount: '2-3 copas por semana',
        notes: 'Consumo social'
      },
      hasDrugs: false,
      drugs: null,
      hasOtherHabits: true,
      otherHabits: [
        {
          habit: 'Consumo excesivo de café',
          frequency: 'Diario',
          amount: '4-5 tazas',
          notes: 'Intenta reducir el consumo'
        }
      ]
    },
    pregnancy: {
      isPregnant: false,
      pregnancyInfo: null,
      previousPregnancies: [
        {
          date: '2018-05-15',
          clinic: 'Clínica Materno-Infantil',
          outcome: 'Parto normal',
          notes: 'Sin complicaciones'
        }
      ]
    }
  };

  // Lista de enfermedades comunes
  const commonDiseases = [
    'Diabetes Mellitus',
    'Hipertensión Arterial',
    'Asma',
    'Artritis',
    'Enfermedad Cardíaca',
    'Enfermedad Renal',
    'Enfermedad Hepática',
    'Enfermedad Pulmonar',
    'Enfermedad Tiroidea',
    'Cáncer',
    'VIH/SIDA',
    'Tuberculosis',
    'Epilepsia',
    'Migraña',
    'Depresión',
    'Ansiedad',
    'Otra'
  ];

  // Lista de medicamentos comunes
  const commonMedications = [
    'Metformina',
    'Lisinopril',
    'Atorvastatina',
    'Omeprazol',
    'Paracetamol',
    'Ibuprofeno',
    'Aspirina',
    'Insulina',
    'Warfarina',
    'Levotiroxina',
    'Alprazolam',
    'Sertralina',
    'Amlodipina',
    'Losartán',
    'Otro'
  ];

  // Lista de alergias comunes
  const commonAllergies = [
    'Penicilina',
    'Látex',
    'Polen',
    'Ácaros',
    'Polvo',
    'Mariscos',
    'Maní',
    'Lactosa',
    'Gluten',
    'Huevos',
    'Sulfas',
    'Otro'
  ];

  // Niveles de severidad
  const severityLevels = [
    'Leve',
    'Moderado',
    'Severo',
    'Crítico'
  ];

  // Lista de tipos de cirugías comunes
  const commonSurgeries = [
    'Apendicectomía',
    'Colecistectomía',
    'Artroscopia',
    'Cesárea',
    'Histerectomía',
    'Prostatectomía',
    'Cirugía de Cataratas',
    'Cirugía de Hernia',
    'Cirugía de Vesícula',
    'Cirugía de Tiroides',
    'Cirugía de Senos',
    'Cirugía de Rodilla',
    'Cirugía de Cadera',
    'Cirugía de Columna',
    'Cirugía de Corazón',
    'Otra'
  ];

  // Lista de hospitales comunes
  const commonHospitals = [
    'Hospital General',
    'Hospital de Especialidades',
    'Clínica Privada',
    'Centro Médico',
    'Hospital Universitario',
    'Hospital Materno-Infantil',
    'Hospital Oncológico',
    'Hospital de Trauma',
    'Otro'
  ];

  // Lista de razones comunes de hospitalización
  const commonHospitalReasons = [
    'Cirugía Programada',
    'Emergencia Médica',
    'Parto',
    'Enfermedad Aguda',
    'Accidente',
    'Tratamiento Especializado',
    'Observación',
    'Rehabilitación',
    'Otra'
  ];

  // Lista de estados de tabaquismo
  const smokingStatuses = [
    'No fumador',
    'Fumador actual',
    'Ex fumador'
  ];

  // Lista de frecuencias de consumo
  const consumptionFrequencies = [
    'Nunca',
    'Ocasional',
    'Semanal',
    'Diario',
    'Varias veces al día'
  ];

  // Lista de tipos de drogas comunes
  const commonDrugs = [
    'Marihuana',
    'Cocaína',
    'Heroína',
    'Metanfetamina',
    'Éxtasis',
    'Otro'
  ];

  // Lista de resultados de embarazos
  const pregnancyOutcomes = [
    'Parto normal',
    'Cesárea',
    'Aborto espontáneo',
    'Aborto inducido',
    'Parto prematuro',
    'Otro'
  ];

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    // Resetear todos los estados del formulario
    setSelectedDisease('');
    setDiseaseSeverity('');
    setDiseaseDate('');
    setDiseaseTreatment('');
    setDiseaseNotes('');
    setIsUnderTreatment(false);
    // Resetear estados de cirugía
    setSurgeryType('');
    setSurgeryDate('');
    setSurgeryHospital('');
    setSurgerySurgeon('');
    setSurgeryNotes('');
    // Resetear estados de hospitalización
    setHospitalReason('');
    setHospitalName('');
    setHospitalAdmissionDate('');
    setHospitalDischargeDate('');
    setHospitalNotes('');
    // Resetear estados de hábitos
    setHabitType('');
    setSmokingStatus('');
    setSmokingYears('');
    setSmokingCigarettesPerDay('');
    setSmokingQuitDate('');
    setSmokingNotes('');
    setAlcoholFrequency('');
    setAlcoholAmount('');
    setAlcoholNotes('');
    setDrugType('');
    setDrugFrequency('');
    setDrugNotes('');
    setOtherHabit('');
    setOtherHabitFrequency('');
    setOtherHabitAmount('');
    setOtherHabitNotes('');
    // Resetear estados de gestación
    setIsPregnant(false);
    setPregnancyDate('');
    setPregnancyClinic('');
    setPregnancyNotes('');
    setPreviousPregnancyDate('');
    setPreviousPregnancyClinic('');
    setPreviousPregnancyOutcome('');
    setPreviousPregnancyNotes('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    // Por ahora solo cerramos el modal
    handleCloseModal();
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      disease: {
        title: 'Agregar Enfermedad',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enfermedad
              </label>
              <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar enfermedad</option>
                {commonDiseases.map((disease) => (
                  <option key={disease} value={disease}>
                    {disease}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severidad
              </label>
              <select
                value={diseaseSeverity}
                onChange={(e) => setDiseaseSeverity(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar severidad</option>
                {severityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de diagnóstico
              </label>
              <input
                type="date"
                value={diseaseDate}
                onChange={(e) => setDiseaseDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="underTreatment"
                checked={isUnderTreatment}
                onChange={(e) => setIsUnderTreatment(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="underTreatment" className="ml-2 block text-sm text-gray-700">
                En tratamiento
              </label>
            </div>

            {isUnderTreatment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tratamiento
                </label>
                <textarea
                  value={diseaseTreatment}
                  onChange={(e) => setDiseaseTreatment(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describa el tratamiento actual"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas adicionales
              </label>
              <textarea
                value={diseaseNotes}
                onChange={(e) => setDiseaseNotes(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Notas adicionales sobre la enfermedad"
              />
            </div>
          </form>
        )
      },
      medication: {
        title: 'Agregar Medicamento',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicamento
              </label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar medicamento</option>
                {commonMedications.map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosis
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: 500mg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frecuencia
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Una vez al día"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio
              </label>
              <input
                type="date"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Razón del medicamento
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Control de diabetes"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas adicionales
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Ej: Tomar con las comidas"
              />
            </div>
          </form>
        )
      },
      allergy: {
        title: 'Agregar Alergia',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sustancia
              </label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar sustancia</option>
                {commonAllergies.map((allergy) => (
                  <option key={allergy} value={allergy}>
                    {allergy}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reacción
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ej: Erupción cutánea"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severidad
              </label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar severidad</option>
                {severityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas adicionales
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Ej: Evitar cualquier medicamento que contenga penicilina"
              />
            </div>
          </form>
        )
      },
      surgery: {
        title: 'Agregar Cirugía',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Cirugía
              </label>
              <select
                value={surgeryType}
                onChange={(e) => setSurgeryType(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar tipo de cirugía</option>
                {commonSurgeries.map((surgery) => (
                  <option key={surgery} value={surgery}>
                    {surgery}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de la Cirugía
              </label>
              <input
                type="date"
                value={surgeryDate}
                onChange={(e) => setSurgeryDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital o Clínica
              </label>
              <select
                value={surgeryHospital}
                onChange={(e) => setSurgeryHospital(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar hospital</option>
                {commonHospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cirujano
              </label>
              <input
                type="text"
                value={surgerySurgeon}
                onChange={(e) => setSurgerySurgeon(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nombre del cirujano"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas Adicionales
              </label>
              <textarea
                value={surgeryNotes}
                onChange={(e) => setSurgeryNotes(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Ej: Cirugía laparoscópica, recuperación sin complicaciones"
              />
            </div>
          </form>
        )
      },
      hospitalization: {
        title: 'Agregar Hospitalización',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Razón de Hospitalización
              </label>
              <select
                value={hospitalReason}
                onChange={(e) => setHospitalReason(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar razón</option>
                {commonHospitalReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital o Clínica
              </label>
              <select
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar hospital</option>
                {commonHospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Ingreso
              </label>
              <input
                type="date"
                value={hospitalAdmissionDate}
                onChange={(e) => setHospitalAdmissionDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Alta
              </label>
              <input
                type="date"
                value={hospitalDischargeDate}
                onChange={(e) => setHospitalDischargeDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas Adicionales
              </label>
              <textarea
                value={hospitalNotes}
                onChange={(e) => setHospitalNotes(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="3"
                placeholder="Ej: Recuperación satisfactoria, sin complicaciones"
              />
            </div>
          </form>
        )
      },
      habits: {
        title: 'Agregar Hábito',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Hábito
              </label>
              <select
                value={habitType}
                onChange={(e) => setHabitType(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar tipo de hábito</option>
                <option value="smoking">Tabaquismo</option>
                <option value="alcohol">Consumo de Alcohol</option>
                <option value="drugs">Consumo de Drogas</option>
                <option value="other">Otro Hábito</option>
              </select>
            </div>

            {habitType === 'smoking' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar estado</option>
                    {smokingStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {smokingStatus === 'Fumador actual' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Años fumando
                      </label>
                      <input
                        type="number"
                        value={smokingYears}
                        onChange={(e) => setSmokingYears(e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cigarrillos por día
                      </label>
                      <input
                        type="number"
                        value={smokingCigarettesPerDay}
                        onChange={(e) => setSmokingCigarettesPerDay(e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </>
                )}

                {smokingStatus === 'Ex fumador' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de abandono
                    </label>
                    <input
                      type="date"
                      value={smokingQuitDate}
                      onChange={(e) => setSmokingQuitDate(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={smokingNotes}
                    onChange={(e) => setSmokingNotes(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ej: Intenta reducir el consumo"
                  />
                </div>
              </>
            )}

            {habitType === 'alcohol' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia de consumo
                  </label>
                  <select
                    value={alcoholFrequency}
                    onChange={(e) => setAlcoholFrequency(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar frecuencia</option>
                    {consumptionFrequencies.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    value={alcoholAmount}
                    onChange={(e) => setAlcoholAmount(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ej: 2-3 copas por semana"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={alcoholNotes}
                    onChange={(e) => setAlcoholNotes(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ej: Consumo social"
                  />
                </div>
              </>
            )}

            {habitType === 'drugs' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de droga
                  </label>
                  <select
                    value={drugType}
                    onChange={(e) => setDrugType(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    {commonDrugs.map((drug) => (
                      <option key={drug} value={drug}>
                        {drug}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia de consumo
                  </label>
                  <select
                    value={drugFrequency}
                    onChange={(e) => setDrugFrequency(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar frecuencia</option>
                    {consumptionFrequencies.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={drugNotes}
                    onChange={(e) => setDrugNotes(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ej: Detalles sobre el consumo"
                  />
                </div>
              </>
            )}

            {habitType === 'other' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del hábito
                  </label>
                  <input
                    type="text"
                    value={otherHabit}
                    onChange={(e) => setOtherHabit(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ej: Consumo excesivo de café"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia
                  </label>
                  <select
                    value={otherHabitFrequency}
                    onChange={(e) => setOtherHabitFrequency(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar frecuencia</option>
                    {consumptionFrequencies.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="text"
                    value={otherHabitAmount}
                    onChange={(e) => setOtherHabitAmount(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ej: 4-5 tazas"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={otherHabitNotes}
                    onChange={(e) => setOtherHabitNotes(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ej: Intenta reducir el consumo"
                  />
                </div>
              </>
            )}
          </form>
        )
      },
      pregnancy: {
        title: 'Agregar Información de Gestación',
        content: (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPregnant"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPregnant" className="ml-2 block text-sm text-gray-700">
                Está gestando actualmente
              </label>
            </div>

            {isPregnant && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    value={pregnancyDate}
                    onChange={(e) => setPregnancyDate(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clínica de seguimiento
                  </label>
                  <input
                    type="text"
                    value={pregnancyClinic}
                    onChange={(e) => setPregnancyClinic(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Nombre de la clínica"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={pregnancyNotes}
                    onChange={(e) => setPregnancyNotes(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    placeholder="Ej: Detalles sobre el embarazo actual"
                  />
                </div>
              </>
            )}

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Gestación Anterior</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={previousPregnancyDate}
                  onChange={(e) => setPreviousPregnancyDate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clínica
                </label>
                <input
                  type="text"
                  value={previousPregnancyClinic}
                  onChange={(e) => setPreviousPregnancyClinic(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nombre de la clínica"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resultado
                </label>
                <select
                  value={previousPregnancyOutcome}
                  onChange={(e) => setPreviousPregnancyOutcome(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Seleccionar resultado</option>
                  {pregnancyOutcomes.map((outcome) => (
                    <option key={outcome} value={outcome}>
                      {outcome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas adicionales
                </label>
                <textarea
                  value={previousPregnancyNotes}
                  onChange={(e) => setPreviousPregnancyNotes(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Ej: Detalles sobre la gestación anterior"
                />
              </div>
            </div>
          </form>
        )
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {modalContent[modalType]?.title}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {modalContent[modalType]?.content}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderYesNoField = (label, value) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Sí' : 'No'}
      </span>
    </div>
  );

  const renderDiseasesList = (diseases) => (
    <div className="space-y-4">
      {diseases.map((disease, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{disease.name}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Severidad:</span> {disease.severity}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Fecha de diagnóstico:</span> {disease.diagnosisDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">En tratamiento:</span> {disease.isUnderTreatment ? 'Sí' : 'No'}
                </p>
                {disease.isUnderTreatment && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tratamiento:</span> {disease.treatment}
                  </p>
                )}
                {disease.notes && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {disease.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMedicationsList = (medications) => (
    <div className="space-y-4">
      {medications.map((med, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{med.name}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Dosis:</span> {med.dosage}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Frecuencia:</span> {med.frequency}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Fecha de inicio:</span> {med.startDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Razón:</span> {med.reason}
                </p>
                {med.notes && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {med.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAllergiesList = (allergies) => (
    <div className="space-y-4">
      {allergies.map((allergy, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{allergy.substance}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Reacción:</span> {allergy.reaction}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Severidad:</span> {allergy.severity}
                </p>
                {allergy.notes && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {allergy.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSurgeriesList = (surgeries) => (
    <div className="space-y-4">
      {surgeries.map((surgery, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{surgery.type}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Fecha:</span> {surgery.date}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Hospital:</span> {surgery.hospital}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Cirujano:</span> {surgery.surgeon}
                </p>
                {surgery.notes && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {surgery.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHospitalizationsList = (hospitalizations) => (
    <div className="space-y-4">
      {hospitalizations.map((hosp, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{hosp.reason}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Hospital:</span> {hosp.hospital}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Ingreso:</span> {hosp.admissionDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Alta:</span> {hosp.dischargeDate}
                </p>
                {hosp.notes && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {hosp.notes}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHabitsSection = (habits) => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Hábitos</h4>
        <div className="space-y-4">
          {renderYesNoField('Fuma', habits.hasSmoking)}
          {habits.hasSmoking && habits.smoking && (
            <div className="ml-4 mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Estado:</span> {habits.smoking.status}
              </p>
              {habits.smoking.status === 'Ex fumador' && (
                <>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Años fumando:</span> {habits.smoking.years}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cigarrillos por día:</span> {habits.smoking.cigarettesPerDay}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Fecha de abandono:</span> {habits.smoking.quitDate}
                  </p>
                </>
              )}
              {habits.smoking.notes && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notas:</span> {habits.smoking.notes}
                </p>
              )}
            </div>
          )}

          {renderYesNoField('Consume alcohol', habits.hasAlcohol)}
          {habits.hasAlcohol && habits.alcohol && (
            <div className="ml-4 mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Frecuencia:</span> {habits.alcohol.frequency}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Cantidad:</span> {habits.alcohol.amount}
              </p>
              {habits.alcohol.notes && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notas:</span> {habits.alcohol.notes}
                </p>
              )}
            </div>
          )}

          {renderYesNoField('Consume drogas', habits.hasDrugs)}
          {habits.hasDrugs && habits.drugs && (
            <div className="ml-4 mt-2 space-y-2">
              {/* Detalles del consumo de drogas */}
            </div>
          )}

          {renderYesNoField('Otros hábitos', habits.hasOtherHabits)}
          {habits.hasOtherHabits && habits.otherHabits && (
            <div className="space-y-4 mt-4">
              {habits.otherHabits.map((habit, index) => (
                <div key={index} className="ml-4 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{habit.habit}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Frecuencia:</span> {habit.frequency}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cantidad:</span> {habit.amount}
                  </p>
                  {habit.notes && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notas:</span> {habit.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPregnancySection = (pregnancy) => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Gestación</h4>
        <div className="space-y-4">
          {renderYesNoField('Está gestando', pregnancy.isPregnant)}
          {pregnancy.isPregnant && pregnancy.pregnancyInfo && (
            <div className="ml-4 mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Fecha:</span> {pregnancy.pregnancyInfo.date}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Clínica:</span> {pregnancy.pregnancyInfo.clinic}
              </p>
              {pregnancy.pregnancyInfo.notes && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notas:</span> {pregnancy.pregnancyInfo.notes}
                </p>
              )}
            </div>
          )}

          {pregnancy.previousPregnancies && pregnancy.previousPregnancies.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Gestaciones anteriores</h5>
              <div className="space-y-3">
                {pregnancy.previousPregnancies.map((prev, index) => (
                  <div key={index} className="ml-4 bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Fecha:</span> {prev.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Clínica:</span> {prev.clinic}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Resultado:</span> {prev.outcome}
                    </p>
                    {prev.notes && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notas:</span> {prev.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-600 mb-6">Antecedentes Generales</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Enfermedades</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('disease')}
                    >
                      + Agregar Enfermedad
                    </button>
                  </div>
                  {renderYesNoField('Tiene enfermedades', medicalHistory.general.hasDiseases)}
                  {medicalHistory.general.hasDiseases && medicalHistory.general.diseases.length > 0 && (
                    <div className="mt-4">
                      {renderDiseasesList(medicalHistory.general.diseases)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Medicamentos</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('medication')}
                    >
                      + Agregar Medicamento
                    </button>
                  </div>
                  {renderYesNoField('Toma medicamentos', medicalHistory.general.hasMedications)}
                  {medicalHistory.general.hasMedications && medicalHistory.general.medications.length > 0 && (
                    <div className="mt-4">
                      {renderMedicationsList(medicalHistory.general.medications)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Alergias</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('allergy')}
                    >
                      + Agregar Alergia
                    </button>
                  </div>
                  {renderYesNoField('Tiene alergias', medicalHistory.general.hasAllergies)}
                  {medicalHistory.general.hasAllergies && medicalHistory.general.allergies.length > 0 && (
                    <div className="mt-4">
                      {renderAllergiesList(medicalHistory.general.allergies)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'surgeries':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-600 mb-6">Cirugías y Hospitalizaciones</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Cirugías</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('surgery')}
                    >
                      + Agregar Cirugía
                    </button>
                  </div>
                  {renderYesNoField('Ha tenido cirugías', medicalHistory.surgeries.hasSurgeries)}
                  {medicalHistory.surgeries.hasSurgeries && medicalHistory.surgeries.surgeries.length > 0 && (
                    <div className="mt-4">
                      {renderSurgeriesList(medicalHistory.surgeries.surgeries)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Hospitalizaciones</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('hospitalization')}
                    >
                      + Agregar Hospitalización
                    </button>
                  </div>
                  {renderYesNoField('Ha sido hospitalizado', medicalHistory.surgeries.hasHospitalizations)}
                  {medicalHistory.surgeries.hasHospitalizations && medicalHistory.surgeries.hospitalizations.length > 0 && (
                    <div className="mt-4">
                      {renderHospitalizationsList(medicalHistory.surgeries.hospitalizations)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'habits':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-600 mb-6">Hábitos</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Hábitos</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('habits')}
                    >
                      + Agregar Hábito
                    </button>
                  </div>
                  {renderHabitsSection(medicalHistory.habits)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'pregnancy':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-600 mb-6">Gestación</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Información de Gestación</h4>
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => handleOpenModal('pregnancy')}
                    >
                      + Agregar Información de Gestación
                    </button>
                  </div>
                  {renderPregnancySection(medicalHistory.pregnancy)}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sections = [
    { id: 'general', label: 'Antecedentes Generales' },
    { id: 'surgeries', label: 'Cirugías y Hospitalizaciones' },
    { id: 'habits', label: 'Hábitos' },
    { id: 'pregnancy', label: 'Gestación' }
  ];

  return (
    <div className="space-y-6">
      {renderModal()}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Historial Médico</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsEditing(true)}
          >
            Editar Historial
          </button>
        </div>

        {/* Navegación entre secciones */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Contenido de la sección activa */}
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default PatientMedicalHistory; 