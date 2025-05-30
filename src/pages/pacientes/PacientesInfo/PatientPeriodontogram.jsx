import React, { useState } from 'react';
import { motion } from 'framer-motion';
import periodontogramImage from '../../../images/periodontograma.png';

const teethNumbers = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28,
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38
];

const toothSegmentsMap = {
  // Upper teeth (18-28)
  18: { top: '0%', left: '00%', width: '7.4%',   height: '50%' },
  17: { top: '0%', left: '7.4%', width: '7%',    height: '50%' },
  16: { top: '0%', left: '14.4%', width: '8.1%', height: '50%' },
  15: { top: '0%', left: '22.5%', width: '5%',   height: '50%' },
  14: { top: '0%', left: '27.5%', width: '5.3%', height: '50%' },
  13: { top: '0%', left: '32.8%', width: '6.3%', height: '50%' },
  12: { top: '0%', left: '39%', width: '4.9%',   height: '50%' },
  11: { top: '0%', left: '43.8%', width: '6.1%', height: '50%' },
  21: { top: '0%', left: '49.8%', width: '6.4%', height: '50%' },
  22: { top: '0%', left: '56.1%', width: '4.7%', height: '50%' },
  23: { top: '0%', left: '60.7%', width: '6.4%', height: '50%' },
  24: { top: '0%', left: '67%', width: '5.3%',   height: '50%' },
  25: { top: '0%', left: '72.2%', width: '5.2%', height: '50%' },
  26: { top: '0%', left: '77.3%', width: '8.3%', height: '50%' },
  27: { top: '0%', left: '85.5%', width: '7%',   height: '50%' },
  28: { top: '0%', left: '92.4%', width: '7.6%', height: '50%' },

  // Lower teeth (48-38)
  48: { top: '50%', left: '00%', width: '7.4%',   height: '50%' },
  47: { top: '50%', left: '7.4%', width: '7%',    height: '50%' },
  46: { top: '50%', left: '14.4%', width: '8.1%', height: '50%' },
  45: { top: '50%', left: '22.5%', width: '5%',   height: '50%' },
  44: { top: '50%', left: '27.5%', width: '5.3%', height: '50%' },
  43: { top: '50%', left: '32.8%', width: '6.3%', height: '50%' },
  42: { top: '50%', left: '39%', width: '4.9%',   height: '50%' },
  41: { top: '50%', left: '43.8%', width: '6.1%', height: '50%' },
  31: { top: '50%', left: '49.8%', width: '6.4%', height: '50%' },
  32: { top: '50%', left: '56.1%', width: '4.7%', height: '50%' },
  33: { top: '50%', left: '60.7%', width: '6.4%', height: '50%' },
  34: { top: '50%', left: '67%', width: '5.3%',   height: '50%' },
  35: { top: '50%', left: '72.2%', width: '5.2%', height: '50%' },
  36: { top: '50%', left: '77.3%', width: '8.3%', height: '50%' },
  37: { top: '50%', left: '85.5%', width: '7%',   height: '50%' },
  38: { top: '50%', left: '92.4%', width: '7.6%', height: '50%' },
};

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
    // Usamos el mapa para obtener la posición base
    const segment = toothSegmentsMap[tooth];
    if (!segment) return null; // Should not happen if toothNumbers and toothSegmentsMap are in sync

    const topBase = parseFloat(segment.top);
    const leftBase = parseFloat(segment.left);
    const widthBase = parseFloat(segment.width);
    const heightBase = parseFloat(segment.height);

    // Ajustamos ligeramente la posición del ícono dentro del segmento
    const topOffset = heightBase * 0.2; // 20% de la altura del segmento
    const leftOffset = widthBase * 0.4; // Centrar el ícono aproximadamente

    if (data.Existe === false) {
      return (
        <div
          key={`missing-${tooth}`}
          style={{ 
            position: 'absolute', 
            top: `${topBase + topOffset}%`, 
            left: `${leftBase + leftOffset}%`, 
            zIndex: 20 
          }}
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
          style={{ 
            position: 'absolute', 
            top: `${topBase + topOffset}%`, 
            left: `${leftBase + leftOffset}%`, 
            zIndex: 20 
          }}
          className="text-purple-600 text-xl font-bold"
        >
          🦷
        </div>
      );
    }

    // Ajuste para la furcación para que esté un poco más abajo
    const furcationTopOffset = heightBase * 0.55; // 50% de la altura del segmento

    if (data.Furcacion && furcationIcons[data.Furcacion]) {
      return (
        <div
          key={`furcation-${tooth}`}
          style={{
            position: 'absolute', 
            top: `${topBase + furcationTopOffset}%`, // Posición ajustada
            left: `${leftBase + leftOffset}%`, 
            zIndex: 20 
          }}
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
        {teethNumbers.map((tooth) => {
          const segment = toothSegmentsMap[tooth];
          if (!segment) return null; // Should not happen

          return (
            <div
              key={tooth}
              style={{
                position: 'absolute',
                top: segment.top,
                left: segment.left,
                width: segment.width,
                height: segment.height,
                zIndex: 10,
                border: '1px solid red',
                boxSizing: 'border-box',
                backgroundColor: 'transparent'
              }}
              className="cursor-pointer"
              onClick={() => handleToothClick(tooth)}
            />
          );
        })}
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
