import React from 'react';
import ClinicalHistory from '../components/ClinicalHistory';
import Odontogram from '../components/Odontogram';
import Periodontogram from '../components/Periodontogram';
import ConsentForms from '../components/ConsentForms';
import XRayImages from '../components/XRayImages';
import PersonalInfo from '../components/PersonalInfo';
import PatientEvolutions from '../components/PatientEvolutions';
import Consultations from '../components/Consultations';
import Treatments from '../components/Treatments';
import Procedures from '../components/Procedures';
import Anamnesis from '../components/Anamnesis';
import Prescriptions from '../components/Prescriptions';
import ClinicalDocuments from '../components/ClinicalDocuments';

const PatientProfile = () => (
  <div>
    <h1>Perfil del Paciente</h1>
    <PersonalInfo />
    <ClinicalHistory />
    <Odontogram />
    <Periodontogram />
    <ConsentForms />
    <XRayImages />
    <PatientEvolutions />
    <Consultations />
    <Treatments />
    <Procedures />
    <Anamnesis />
    <Prescriptions />
    <ClinicalDocuments />
  </div>
);

export default PatientProfile;
