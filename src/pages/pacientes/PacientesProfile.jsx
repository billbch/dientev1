import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PatientPersonalInfo from './PacientesInfo/PatientPersonalInfo';
import PatientMedicalHistory from './PacientesInfo/PatientMedicalHistory';
import PatientEvolutions from './PacientesInfo/PatientEvolutions';
import PatientAnamnesis from './PacientesInfo/PatientConsents';
import PatientOdontogram from './PacientesInfo/PatientOdontogram';
import PatientPeriodontogram from './PacientesInfo/PatientPeriodontogram';
import PatientRadiographs from './PacientesInfo/PatientRadiographs';
import PatientPrescriptions from './PacientesInfo/PatientPrescriptions';
import PatientClinicalDocuments from './PacientesInfo/PatientClinicalDocuments';
import PatientConsents from './PacientesInfo/PatientConsents';
import PatientDentalHistory from './PacientesInfo/PatientDentalHistory';

const PatientProfile = () => {
  const { patientId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    type: '',
    duration: '30',
    notes: '',
    priority: 'normal'
  });
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

  // Definir los 3 tabs principales con sus subcategorías
  const tabs = [
    { 
      id: 'history', 
      label: 'Historiales', 
      icon: 'clipboard-list',
      subTabs: [
        { id: 'personal', label: 'Información Personal' },
        { id: 'medical', label: 'Historial Médico' },
        { id: 'dental', label: 'Historial Odontológico' }
      ]
    },
    { 
      id: 'clinical', 
      label: 'Clínica', 
      icon: 'stethoscope',
      subTabs: [
        { id: 'evolutions', label: 'Evoluciones' },
        { id: 'odontogram', label: 'Odontograma' },
        { id: 'periodontogram', label: 'Periodontograma' }
      ]
    },
    { 
      id: 'documents', 
      label: 'Documentos', 
      icon: 'folder',
      subTabs: [
        { id: 'rx', label: 'Rx y Documentos' },
        { id: 'clinical', label: 'Documentos Clínicos' },
        { id: 'consent', label: 'Consentimientos' }
      ]
    }
  ];

  // Función para renderizar el contenido según el tab y subtab activo
  const renderTabContent = () => {
    if (activeTab === 'history') {
      switch (activeSubTab) {
        case 'personal':
          return <PatientPersonalInfo patientData={patientData} />;
        case 'medical':
          return <PatientMedicalHistory patientData={patientData} />;
        case 'dental':
          return <PatientDentalHistory patientData={patientData} />;
        default:
          return null;
      }
    } else if (activeTab === 'clinical') {
      switch (activeSubTab) {
        case 'evolutions':
          return <PatientEvolutions patientData={patientData} />;
        case 'odontogram':
          return <PatientOdontogram patientData={patientData} />;
        case 'periodontogram':
          return <PatientPeriodontogram patientData={patientData} />;
        default:
          return null;
      }
    } else if (activeTab === 'documents') {
      switch (activeSubTab) {
        case 'rx':
          return <PatientRadiographs patientData={patientData} />;
        case 'clinical':
          return <PatientClinicalDocuments patientData={patientData} />;
        case 'consent':
          return <PatientConsents patientData={patientData} />;
        default:
          return null;
      }
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

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log('Nueva cita:', appointmentData);
    setShowAppointmentModal(false);
    setAppointmentData({
      date: '',
      time: '',
      type: '',
      duration: '30',
      notes: '',
      priority: 'normal'
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={patientData.profileImage}
                    alt={patientData.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">{patientData.name}, <span className="text-gray-500 text-base">{patientData.age}</span></h1>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600">
                          <span>📧 {patientData.email}</span>
                          <span>📞 {patientData.phone}</span>
                          <span>📍 {patientData.address}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setShowAppointmentModal(true)}
                          className="btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                        >
                          Nueva Cita
                        </button>
                        <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm">
                          Notas
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.938 4.938l14.124 14.124" />
                        </svg>
                        {patientData.alertNotes}
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Próxima: {patientData.nextAppointment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navegación principal y secundaria */}
              <div className="border-b border-gray-100">
                {/* Tabs principales */}
                <div className="flex space-x-1 p-2 border-b border-gray-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setActiveSubTab(tab.subTabs[0].id);
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="w-4 h-4">
                        {getIcon(tab.icon)}
                      </div>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Subtabs */}
                {tabs.find(tab => tab.id === activeTab)?.subTabs && (
                  <div className="flex space-x-1 p-2">
                    {tabs.find(tab => tab.id === activeTab)?.subTabs.map((subTab) => (
                      <button
                        key={subTab.id}
                        onClick={() => setActiveSubTab(subTab.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                          activeSubTab === subTab.id
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contenido del tab activo */}
              <div className="p-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Nueva Cita */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Nueva Cita</h2>
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <input
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Cita</label>
                <select
                  value={appointmentData.type}
                  onChange={(e) => setAppointmentData({...appointmentData, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="consulta">Consulta</option>
                  <option value="limpieza">Limpieza Dental</option>
                  <option value="endodoncia">Endodoncia</option>
                  <option value="ortodoncia">Ortodoncia</option>
                  <option value="extraccion">Extracción</option>
                  <option value="implante">Implante</option>
                  <option value="blanqueamiento">Blanqueamiento</option>
                  <option value="control">Control</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duración (minutos)</label>
                <select
                  value={appointmentData.duration}
                  onChange={(e) => setAppointmentData({...appointmentData, duration: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="90">1.5 horas</option>
                  <option value="120">2 horas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                <select
                  value={appointmentData.priority}
                  onChange={(e) => setAppointmentData({...appointmentData, priority: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="low">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notas</label>
                <textarea
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Añade notas o detalles adicionales..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAppointmentModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Agendar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile; 