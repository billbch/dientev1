import React, { useState } from 'react';

const ClinicalHistory = () => {
  const [patientData, setPatientData] = useState({
    name: 'Juan Pérez',
    age: 30,
    gender: 'Masculino',
    visits: [
      { date: '2025-01-15', treatment: 'Limpieza dental', notes: 'Todo en orden.' },
      { date: '2025-02-20', treatment: 'Extracción de muela', notes: 'Recuperación satisfactoria.' },
    ],
  });

  return (
    <div>
      <h2>Historia Clínica</h2>
      <div>
        <h3>Datos del Paciente</h3>
        <p>Nombre: {patientData.name}</p>
        <p>Edad: {patientData.age}</p>
        <p>Género: {patientData.gender}</p>
      </div>
      <div>
        <h3>Historial de Visitas</h3>
        <ul>
          {patientData.visits.map((visit, index) => (
            <li key={index}>
              <strong>Fecha:</strong> {visit.date} <br />
              <strong>Tratamiento:</strong> {visit.treatment} <br />
              <strong>Notas:</strong> {visit.notes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicalHistory;
