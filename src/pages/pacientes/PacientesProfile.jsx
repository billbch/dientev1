import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PatientMedicalHistory from './PacientesInfo/PatientMedicalHistory';
import PatientEvolutions from './PacientesInfo/PatientEvolutions';
import PatientAnamnesis from './PacientesInfo/PatientConsents';
import PatientOdontogram from './PacientesInfo/PatientOdontogram';
import PatientPeriodontogram from './PacientesInfo/PatientPeriodontogram';
import PatientRadiographs from './PacientesInfo/PatientRadiographs';
import PatientPrescriptions from './PacientesInfo/PatientPrescriptions';
import PatientClinicalDocuments from './PacientesInfo/PatientClinicalDocuments';
import PatientConsents from './PacientesInfo/PatientConsents';

const PatientProfile = () => {
  const { patientId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const menuRef = useRef(null);

  // Datos de ejemplo del paciente
  const patientData = {
    id: patientId,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, Madrid',
    birthDate: '1985-06-15',
    age: '38 años',
    gender: 'Masculino',
    bloodType: 'O+',
    lastVisit: '2024-02-20',
    nextAppointment: '2024-04-10',
    status: 'Activo',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    insuranceProvider: 'Seguros Médicos Plus',
    insuranceNumber: 'SM-123456789',
    primaryDentist: 'Dra. María García',
    alertNotes: 'Alergia a la penicilina',
    treatmentPlan: 'Ortodoncia en curso',
    balance: '€2,500',
    lastPayment: '€300 - 15/02/2024',
    medicalHistory: [
      { id: 1, condition: 'Hipertensión', diagnosisDate: '2020-03-15', status: 'Controlada' },
      { id: 2, condition: 'Diabetes Tipo 2', diagnosisDate: '2019-08-22', status: 'Controlada' },
    ],
    allergies: [
      { id: 1, name: 'Penicilina', reaction: 'Erupción cutánea', severity: 'Moderada' },
      { id: 2, name: 'Látex', reaction: 'Picazón', severity: 'Leve' },
    ],
    medications: [
      { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Una vez al día', startDate: '2020-03-15' },
      { id: 2, name: 'Metformina', dosage: '500mg', frequency: 'Dos veces al día', startDate: '2019-08-22' },
    ],
    treatments: [
      { id: 1, name: 'Ortodoncia', startDate: '2023-01-10', endDate: '2024-07-15', status: 'En progreso' },
      { id: 2, name: 'Limpieza dental', date: '2024-02-20', status: 'Completado' },
    ],
    appointments: [
      { id: 1, date: '2024-04-10', time: '10:00', type: 'Control', status: 'Programada' },
      { id: 2, date: '2024-05-22', time: '15:30', type: 'Limpieza', status: 'Programada' },
    ],
    payments: [
      { id: 1, date: '2024-02-20', amount: 150, method: 'Tarjeta', status: 'Pagado' },
      { id: 2, date: '2024-01-15', amount: 300, method: 'Transferencia', status: 'Pagado' },
    ],
    notes: [
      { id: 1, date: '2024-02-20', content: 'Paciente presenta buena higiene dental. Se recomienda continuar con el tratamiento de ortodoncia.', author: 'Dr. García' },
      { id: 2, date: '2024-01-15', content: 'Primera consulta. Paciente interesado en tratamiento de ortodoncia.', author: 'Dra. Martínez' },
    ],
  };

  // Definir los 9 tabs con sus iconos
  const tabs = [
    { id: 'info', label: 'Información Personal', icon: 'user' },
    { id: 'medical', label: 'Historial Médico', icon: 'heart' },
    { id: 'evolutions', label: 'Evoluciones', icon: 'chart-line' },
    { id: 'anamnesis', label: 'Anamnesis', icon: 'clipboard-list' },
    { id: 'odontogram', label: 'Odontograma', icon: 'tooth' },
    { id: 'periodontogram', label: 'Periodontograma', icon: 'gums' },
    { id: 'rx', label: 'Rx y Documentos', icon: 'x-ray' },
    { id: 'prescriptions', label: 'Recetas', icon: 'prescription' },
    { id: 'clinical', label: 'Documentos Clínicos', icon: 'file-medical' },
    { id: 'consent', label: 'Consentimientos', icon: 'signature' },
  ];

  // Función para renderizar el contenido según el tab activo
  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Datos Personales</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dirección</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.address}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Información Médica</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.birthDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Género</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Grupo Sanguíneo</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.bloodType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado</label>
                      <p className="mt-1 text-sm text-gray-900">{patientData.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'medical':
        return <PatientMedicalHistory patientData={patientData} />;
      case 'evolutions':
        return <PatientEvolutions patientData={patientData} />;
      case 'anamnesis':
        return <PatientAnamnesis patientData={patientData} />;
      case 'odontogram':
        return <PatientOdontogram patientData={patientData} />;
      case 'periodontogram':
        return <PatientPeriodontogram patientData={patientData} />;
      case 'rx':
        return <PatientRadiographs patientData={patientData} />;
      case 'prescriptions':
        return <PatientPrescriptions patientData={patientData} />;
      case 'clinical':
        return <PatientClinicalDocuments patientData={patientData} />;
      case 'consent':
        return <PatientConsents patientData={patientData} />;
      default:
        return null;
    }
  };

  // Función para obtener el icono SVG según el tipo
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        );
      case 'chart-line':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        );
      case 'clipboard-list':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        );
      case 'tooth':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        );
      case 'gums':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        );
      case 'x-ray':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        );
      case 'prescription':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      case 'file-medical':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      case 'signature':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const checkScroll = () => {
    if (menuRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => menu.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Encabezado del perfil */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <img
                  src={patientData.profileImage}
                  alt={patientData.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{patientData.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{patientData.email}</span>
                    <span>•</span>
                    <span>{patientData.phone}</span>
                    <span>•</span>
                    <span>{patientData.address}</span>
                  </div>
                </div>
                <div className="flex items-center ml-auto space-x-3">
                  <div className="flex items-center space-x-2 text-red-500 bg-red-50 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm font-medium">{patientData.alertNotes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{patientData.nextAppointment}</span>
                  </div>
                  <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                    Nueva Cita
                  </button>
                  <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-600">
                    Notas
                  </button>
                </div>
              </div>
            </div>

            {/* Barra de navegación */}
            <div className="relative mb-8">
              <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center">
                <button
                  onClick={scrollLeft}
                  className={`p-1 rounded-full bg-white shadow-md hover:bg-gray-50 ${
                    !showLeftArrow && 'hidden'
                  }`}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <div
                ref={menuRef}
                className="overflow-x-auto scrollbar-hide"
                onScroll={checkScroll}
              >
                <div className="flex items-center px-8 space-x-1 bg-white rounded-lg shadow-sm border border-gray-100">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className="relative group"
                    >
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`p-4 flex items-center justify-center transition-colors ${
                          activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {getIcon(tab.icon)}
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {tab.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                <button
                  onClick={scrollRight}
                  className={`p-1 rounded-full bg-white shadow-md hover:bg-gray-50 ${
                    !showRightArrow && 'hidden'
                  }`}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del tab activo */}
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile; 