import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OdontogramScene from './odonto/OdontogramScene';


const PatientOdontogram = ({ patientData }) => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  // Datos de ejemplo para los dientes
  const teethData = {
    11: { conditions: [{ type: 'decay', date: '2024-02-15', notes: 'Caries superficial' }] },
    12: { conditions: [{ type: 'filling', date: '2024-01-20', notes: 'Amalgama' }] },
    13: { conditions: [] },
    14: { conditions: [{ type: 'crown', date: '2023-12-10', notes: 'Corona de porcelana' }] },
    15: { conditions: [] },
    16: { conditions: [{ type: 'rootCanal', date: '2024-03-01', notes: 'Endodoncia completa' }] },
    17: { conditions: [] },
    18: { conditions: [{ type: 'missing', date: '2023-11-05', notes: 'Extraído' }] },
    21: { conditions: [] },
    22: { conditions: [{ type: 'implant', date: '2024-02-28', notes: 'Implante nuevo' }] },
    23: { conditions: [] },
    24: { conditions: [] },
    25: { conditions: [] },
    26: { conditions: [] },
    27: { conditions: [] },
    28: { conditions: [] },
    31: { conditions: [] },
    32: { conditions: [] },
    33: { conditions: [] },
    34: { conditions: [] },
    35: { conditions: [] },
    36: { conditions: [] },
    37: { conditions: [] },
    38: { conditions: [] },
    41: { conditions: [] },
    42: { conditions: [] },
    43: { conditions: [] },
    44: { conditions: [] },
    45: { conditions: [] },
    46: { conditions: [] },
    47: { conditions: [] },
    48: { conditions: [] },
  };

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(toothNumber);
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setSelectedTooth(null);
  };

  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl">🦷</span>
          <h3 className="text-lg font-semibold text-blue-600">Odontograma</h3>
        </div>

        <OdontogramScene
          selectedTooth={selectedTooth}
          setSelectedTooth={handleToothClick}
          teethData={teethData}
        />
      </div>

      {/* Panel lateral */}
      <AnimatePresence>
        {showPanel && selectedTooth && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Diente {selectedTooth}
                </h3>
                <button
                  onClick={handleClosePanel}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Condiciones actuales */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Condiciones Actuales</h4>
                  <div className="space-y-2">
                    {teethData[selectedTooth]?.conditions.map((condition, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {condition.type.charAt(0).toUpperCase() + condition.type.slice(1)}
                          </p>
                          <p className="text-sm text-gray-500">{condition.notes}</p>
                        </div>
                        <span className="text-xs text-gray-400">{condition.date}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Agregar nueva condición */}
                <div>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Condición
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}:(
          <></>
        )
      </AnimatePresence>
    </div>
  );
};

export default PatientOdontogram; 