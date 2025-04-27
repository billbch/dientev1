// PatientOdontogramImage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import odontogramaImage from '../../../../images/odontograma.jpg';
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
    { id: 18, top: '5%', left: '2%' }, { id: 17, top: '5%', left: '7%' },
    { id: 16, top: '5%', left: '12%' }, { id: 15, top: '5%', left: '17%' },
    { id: 14, top: '5%', left: '22%' }, { id: 13, top: '5%', left: '27%' },
    { id: 12, top: '5%', left: '32%' }, { id: 11, top: '5%', left: '37%' },
    { id: 21, top: '5%', left: '42%' }, { id: 22, top: '5%', left: '47%' },
    { id: 23, top: '5%', left: '52%' }, { id: 24, top: '5%', left: '57%' },
    { id: 25, top: '5%', left: '62%' }, { id: 26, top: '5%', left: '67%' },
    { id: 27, top: '5%', left: '72%' }, { id: 28, top: '5%', left: '77%' },
    { id: 48, top: '55%', left: '2%' }, { id: 47, top: '55%', left: '7%' },
    { id: 46, top: '55%', left: '12%' }, { id: 45, top: '55%', left: '17%' },
    { id: 44, top: '55%', left: '22%' }, { id: 43, top: '55%', left: '27%' },
    { id: 42, top: '55%', left: '32%' }, { id: 41, top: '55%', left: '37%' },
    { id: 31, top: '55%', left: '42%' }, { id: 32, top: '55%', left: '47%' },
    { id: 33, top: '55%', left: '52%' }, { id: 34, top: '55%', left: '57%' },
    { id: 35, top: '55%', left: '62%' }, { id: 36, top: '55%', left: '67%' },
    { id: 37, top: '55%', left: '72%' }, { id: 38, top: '55%', left: '77%' },
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
              style={{ position: 'absolute', top: tooth.top, left: tooth.left, width: '5%', height: '10%' }}
              className={`cursor-pointer ${selectedTooth === tooth.id ? 'bg-blue-200 bg-opacity-50 rounded-full' : ''}`}
              onClick={() => handleToothClick(tooth.id)}
            >
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