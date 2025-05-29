import React, { useState } from 'react';

const PatientPersonalInfo = ({ patientData }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Datos de ejemplo para la información personal
  const personalInfo = {
    personal: {
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      address: patientData.address,
      birthDate: patientData.birthDate,
      age: patientData.age,
      gender: patientData.gender,
      bloodType: patientData.bloodType,
      status: patientData.status
    },
    medical: {
      insuranceProvider: patientData.insuranceProvider,
      insuranceNumber: patientData.insuranceNumber,
      primaryDentist: patientData.primaryDentist,
      alertNotes: patientData.alertNotes,
      treatmentPlan: patientData.treatmentPlan
    },
    financial: {
      balance: patientData.balance,
      lastPayment: patientData.lastPayment
    }
  };

  const renderSection = (title, data) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-500 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <p className="text-sm text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Información Personal</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsEditing(true)}
          >
            Editar Información
          </button>
        </div>

        <div className="space-y-6">
          {renderSection('Datos Personales', personalInfo.personal)}
          {renderSection('Información Médica', personalInfo.medical)}
          {renderSection('Información Financiera', personalInfo.financial)}
        </div>
      </div>
    </div>
  );
};

export default PatientPersonalInfo; 