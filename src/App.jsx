import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import DashboardDiente from './pages/DashboardDiente';
import Pacientes from './pages/pacientes/Pacientes';
import PatientProfile from './pages/pacientes/PacientesProfile';
import PageNotFound from './pages/utility/PageNotFound';
// Import pages


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardDiente />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/:patientId" element={<PatientProfile />} />
       
      
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
