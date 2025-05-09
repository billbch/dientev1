// PatientOdontogramImage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import odontogramaImage from '../../../../images/odontograma2.png';
import coronaIcon from '../../../../images/user-avatar-32.png';
import implanteIcon from '../../../../images/user-avatar-32.png';
import endodonciaIcon from '../../../../images/user-avatar-32.png';

const treatmentIcons = {
  "Corona": coronaIcon,
  "Implante": implanteIcon,
  "Endodoncia": endodonciaIcon
};

const ToothPanel = ({ selectedTooth, setTreatment, onClose }) => {
  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', opacity: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  };

  const treatments = [
    "Corona", "Corona provisoria", "Endodoncia", "Restauración",
    "Implante", "Perno muñon", "Otro", "Prótesis removible",
    "Corona (mal estado)", "Corona provisoria (mal estado)",
    "Perno muñon (mal estado)", "Restauración (mal estado)"
  ];

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Diente {selectedTooth}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {treatments.map(treatment => (
            <button
              key={treatment}
              onClick={() => setTreatment(selectedTooth, treatment)}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded"
            >
              {treatment}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PatientOdontogramImage = () => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [toothTreatments, setToothTreatments] = useState({});

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(toothNumber);
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setSelectedTooth(null);
  };

  const setTreatment = (toothNumber, treatment) => {
    setToothTreatments(prev => ({
      ...prev,
      [toothNumber]: treatment
    }));
    handleClosePanel();
  };

  const teethMap = [
    { id: 18, top: '0%', left: '0%',    width: '7.4%' }, //1
    { id: 17, top: '0%', left: '7.3%',  width: '7.4%' }, //2
    { id: 16, top: '0%', left: '14.6%', width: '8%' }, //3
    { id: 15, top: '0%', left: '22.5%', width: '5.2%' }, //4
    { id: 14, top: '0%', left: '27.6%', width: '5.2%' }, //5
    { id: 13, top: '0%', left: '32.7%', width: '6.5%' }, //6
    { id: 12, top: '0%', left: '39%',   width: '5.0%' }, //7 
    { id: 11, top: '0%', left: '43.9%', width: '6.2%' },//8
    { id: 21, top: '0%', left: '50%',   width: '6.2%' },//9
    { id: 22, top: '0%', left: '56.1%', width: '4.8%' },//10
    { id: 23, top: '0%', left: '60.8%', width: '6.4%' },//11
    { id: 24, top: '0%', left: '67.1%', width: '5.2%' },//12
    { id: 25, top: '0%', left: '72.2%', width: '5.5%' },//13
    { id: 26, top: '0%', left: '77.6%', width: '8.2%' },//14
    { id: 27, top: '0%', left: '85.7%', width: '6.9%' },//15
    { id: 28, top: '0%', left: '92.5%', width: '7.5%' },//16
    { id: 48, top: '50%', left: '0.00%', width: '7.4%' },//17   ///mitad
    { id: 47, top: '50%', left: '7.3%',  width: '7.4%' },//18    
    { id: 46, top: '50%', left: '14.6%', width: '8%' }, //19
    { id: 45, top: '50%', left: '22.5%', width: '5.2%' },//20
    { id: 44, top: '50%', left: '27.6%', width: '5.2%' },//21
    { id: 43, top: '50%', left: '32.7%', width: '6.5%' },//22
    { id: 42, top: '50%', left: '39.0%', width: '5.0%' },//23
    { id: 41, top: '50%', left: '43.9%', width: '6.2%' },//24
    { id: 31, top: '50%', left: '50.0%', width: '6.2%' },//25
    { id: 32, top: '50%', left: '56.1%', width: '4.8%' },//26
    { id: 33, top: '50%', left: '60.8%', width: '6.4%' },//27
    { id: 34, top: '50%', left: '67.1%', width: '5.2%' },//28
    { id: 35, top: '50%', left: '72.2%', width: '5.5%' },//29
    { id: 36, top: '50%', left: '77.6%', width: '8.2%' },//30
    { id: 37, top: '50%', left: '85.7%', width: '6.9%' },//31
    { id: 38, top: '50%', left: '92.5%', width: '7.5%' },//32
  ];


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">🦷</span>
          <h3 className="text-lg font-semibold text-blue-600">Odontograma Imagen</h3>
        </div>
        <div className="relative">
          <img src={odontogramaImage} alt="Odontograma" className="w-full" />
          {teethMap.map((tooth) => (
            <div
              key={tooth.id}
              style={{
                position: 'absolute',
                top: tooth.top,
                left: tooth.left,
                width: tooth.width,
                height: '50%',
                border: '1px solid red',   // 🔥 AGREGAMOS ESTA LINEA
              }}
              className={`cursor-pointer ${selectedTooth === tooth.id ? 'bg-blue-200 bg-opacity-50 rounded-md' : ''}`}
              onClick={() => handleToothClick(tooth.id)}
            >
              {/* Icono si hay tratamiento */}
              {toothTreatments[tooth.id] && treatmentIcons[toothTreatments[tooth.id]] && (
                <img src={treatmentIcons[toothTreatments[tooth.id]]} alt="Tratamiento" className="w-full h-full object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPanel && selectedTooth && (
          <ToothPanel
            selectedTooth={selectedTooth}
            setTreatment={setTreatment}
            onClose={handleClosePanel}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientOdontogramImage;