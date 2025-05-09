import React, { useState } from 'react';
import { motion } from 'framer-motion';
import periodontogramImage from '../../../images/periodontograma.png';

const teethNumbers = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28,
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38
];

const mobilityOptions = ["Grado 1", "Grado 2", "Grado 3"];
const prognosisOptions = ["B", "R", "M"];
const furcationIcons = {
  "Grado 1": "○",
  "Grado 2": "◐",
  "Grado 3": "●"
};

const PatientPeriodontogram = () => {
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [teethData, setTeethData] = useState({});

  const handleToothClick = (tooth) => {
    setSelectedTooth(tooth);
  };

  const handleFieldChange = (field, value) => {
    setTeethData(prev => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        [field]: value
      }
    }));
  };

  const renderOverlayIcon = (tooth, index) => {
    const data = teethData[tooth] || {};
    const row = Math.floor(index / 16);
    const col = index % 16;
    const top = 15 + row * 45;
    const left = col * 6.25 + 2.5;

    if (data.Existe === false) {
      return (
        <div
          key={`missing-${tooth}`}
          style={{ position: 'absolute', top: `${top + 10}%`, left: `${left}%`, zIndex: 20 }}
          className="text-red-600 text-xl font-bold"
        >
          ✖
        </div>
      );
    }

    if (data.Implante) {
      return (
        <div
          key={`implant-${tooth}`}
          style={{ position: 'absolute', top: `${top + 10}%`, left: `${left}%`, zIndex: 20 }}
          className="text-purple-600 text-xl font-bold"
        >
          🦷
        </div>
      );
    }

    if (data.Furcacion && furcationIcons[data.Furcacion]) {
      return (
        <div
          key={`furcation-${tooth}`}
          style={{ position: 'absolute', top: `${top + 25}%`, left: `${left}%`, zIndex: 20 }}
          className="text-black text-xl"
        >
          {furcationIcons[data.Furcacion]}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full max-w-6xl mx-auto">
        <img src={periodontogramImage} alt="Periodontograma" className="w-full h-auto" />
        {teethNumbers.map((tooth, index) => (
          <div
            key={tooth}
            style={{
              position: 'absolute',
              top: `${15 + Math.floor(index / 16) * 45}%`,
              left: `${(index % 16) * 6.25}%`,
              width: '6.25%',
              height: '45%',
              zIndex: 10,
            }}
            className="cursor-pointer"
            onClick={() => handleToothClick(tooth)}
          />
        ))}
        {teethNumbers.map((tooth, index) => renderOverlayIcon(tooth, index))}
      </div>

      {selectedTooth && (
        <motion.div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Diente {selectedTooth}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label>
              <input type="checkbox" checked={teethData[selectedTooth]?.Implante || false} onChange={(e) => handleFieldChange('Implante', e.target.checked)} /> Implante
            </label>
            <label>
              <input type="checkbox" checked={teethData[selectedTooth]?.Existe !== false} onChange={(e) => handleFieldChange('Existe', e.target.checked)} /> Diente presente
            </label>
            <div>
              <label>Movilidad</label>
              <select value={teethData[selectedTooth]?.Movilidad || ''} onChange={(e) => handleFieldChange('Movilidad', e.target.value)} className="w-full border px-2 py-1 rounded">
                <option value="">--</option>
                {mobilityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label>Pronóstico individual</label>
              <select value={teethData[selectedTooth]?.Pronostico || ''} onChange={(e) => handleFieldChange('Pronostico', e.target.value)} className="w-full border px-2 py-1 rounded">
                <option value="">--</option>
                {prognosisOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label>Furcación</label>
              <select value={teethData[selectedTooth]?.Furcacion || ''} onChange={(e) => handleFieldChange('Furcacion', e.target.value)} className="w-full border px-2 py-1 rounded">
                <option value="">--</option>
                {Object.keys(furcationIcons).map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label>Sangrado / Supuración</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mesial', 'Vestibular', 'Distal'].map(pos => (
                  <input
                    key={pos}
                    type="text"
                    placeholder={pos}
                    value={teethData[selectedTooth]?.[`Sangrado_${pos}`] || ''}
                    onChange={(e) => handleFieldChange(`Sangrado_${pos}`, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                ))}
              </div>
            </div>
            <div>
              <label>Placa</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mesial', 'Vestibular', 'Distal'].map(pos => (
                  <input
                    key={pos}
                    type="text"
                    placeholder={pos}
                    value={teethData[selectedTooth]?.[`Placa_${pos}`] || ''}
                    onChange={(e) => handleFieldChange(`Placa_${pos}`, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                ))}
              </div>
            </div>
            <div>
              <label>Anchura de encía (mm)</label>
              <input type="number" value={teethData[selectedTooth]?.Anchura || ''} onChange={(e) => handleFieldChange('Anchura', e.target.value)} className="w-full border px-2 py-1 rounded" />
            </div>
            <div>
              <label>Margen gingival</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mesial', 'Vestibular', 'Distal'].map(pos => (
                  <input
                    key={pos}
                    type="number"
                    placeholder={pos}
                    value={teethData[selectedTooth]?.[`Margen_${pos}`] || ''}
                    onChange={(e) => handleFieldChange(`Margen_${pos}`, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                ))}
              </div>
            </div>
            <div>
              <label>Profundidad de sondaje</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mesial', 'Vestibular', 'Distal'].map(pos => (
                  <input
                    key={pos}
                    type="number"
                    placeholder={pos}
                    value={teethData[selectedTooth]?.[`Profundidad_${pos}`] || ''}
                    onChange={(e) => handleFieldChange(`Profundidad_${pos}`, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PatientPeriodontogram;
