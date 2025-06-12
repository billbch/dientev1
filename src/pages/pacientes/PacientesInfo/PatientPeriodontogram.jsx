import React, { useState, useRef, useEffect } from "react";
import periodontogramImage from "../../../images/odontograma/topodontologia.png"; // Tu imagen
import periodontogramImage2 from "../../../images/odontograma/botodontology.png"; // Tu imagen

const upperTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
// Posiciones ajustadas para los dientes superiores
const upperTeethPositions = [
  { start: 0.019, width: 0.044 }, // 18
  { start: 0.085, width: 0.052 }, // 17
  { start: 0.161, width: 0.052 }, // 16
  { start: 0.24, width: 0.025 }, // 15
  { start: 0.287, width: 0.028 }, // 14
  { start: 0.345, width: 0.033 }, // 13
  { start: 0.4, width: 0.03 }, // 12
  { start: 0.45, width: 0.035 }, // 11
  { start: 0.515, width: 0.034 }, // 21
  { start: 0.57, width: 0.028 }, // 22
  { start: 0.623, width: 0.031 }, // 23
  { start: 0.682, width: 0.027 }, // 24
  { start: 0.733, width: 0.026 }, // 25
  { start: 0.788, width: 0.05 }, // 26
  { start: 0.865, width: 0.048 }, // 27
  { start: 0.934, width: 0.046 }, // 28
];

// Posiciones ajustadas para los dientes inferiores
const lowerTeethPositions = [
  { start: 0.019, width: 0.044 }, // 48
  { start: 0.085, width: 0.052 }, // 47
  { start: 0.161, width: 0.052 }, // 46
  { start: 0.24, width: 0.025 },  // 45
  { start: 0.287, width: 0.028 }, // 44
  { start: 0.345, width: 0.033 }, // 43
  { start: 0.407, width: 0.026 },  // 42
  { start: 0.453, width: 0.035 },  // 41
  { start: 0.512, width: 0.034 }, // 31
  { start: 0.57, width: 0.025 },  // 32
  { start: 0.623, width: 0.031 }, // 33
  { start: 0.682, width: 0.027 }, // 34
  { start: 0.733, width: 0.026 }, // 35
  { start: 0.788, width: 0.048 },  // 36
  { start: 0.865, width: 0.046 }, // 37
  { start: 0.935, width: 0.044 }, // 38
];

// Posiciones ajustadas para los dientes superiores de la segunda imagen (COPIA INICIAL - AJUSTAR)
const upperTeethPositions2 = [
  { start: 0.019, width: 0.046 }, // 18
  { start: 0.0890, width: 0.049 }, // 17
  { start: 0.165, width: 0.051 }, // 16
  { start: 0.24, width: 0.025 }, // 15
  { start: 0.289, width: 0.025 }, // 14
  { start: 0.344, width: 0.028 }, // 13
  { start: 0.403, width: 0.025 }, // 12
  { start: 0.458, width: 0.022 }, // 11
  { start: 0.518, width: 0.023}, // 21
  { start: 0.572, width: 0.025 }, // 22
  { start: 0.625, width: 0.028 }, // 23
  { start: 0.683, width: 0.024 }, // 24
  { start: 0.734, width: 0.026 }, // 25
  { start: 0.788, width: 0.048}, // 26
  { start: 0.865, width: 0.048 }, // 27
  { start: 0.934, width: 0.046 }, // 28
];

// Posiciones ajustadas para los dientes inferiores de la segunda imagen (COPIA INICIAL - AJUSTAR)
const lowerTeethPositions2 = [
  { start: 0.019, width: 0.044 }, // 48
  { start: 0.089, width: 0.048 }, // 47
  { start: 0.164, width: 0.050 }, // 46
  { start: 0.24, width: 0.025 },  // 45
  { start: 0.290, width: 0.024 }, // 44
  { start: 0.345, width: 0.029 }, // 43
  { start: 0.406, width: 0.024 },  // 42
  { start: 0.455, width: 0.023 },  // 41
  { start: 0.52, width: 0.021 }, // 31
  { start: 0.57, width: 0.025 },  // 32
  { start: 0.623, width: 0.030 }, // 33
  { start: 0.682, width: 0.025 }, // 34
  { start: 0.735, width: 0.026 }, // 35
  { start: 0.788, width: 0.048 },  // 36
  { start: 0.865, width: 0.046 }, // 37
  { start: 0.935, width: 0.046}, // 38
];

function initToothData() {
  const data = {};
  [...upperTeeth, ...lowerTeeth].forEach(n => {
    data[n] = {
      movilidad: '',
      implante: false,
      furca: '',
      furca2: '', // Primera furcación para tabla inferior
      furca3: '', // Segunda furcación para tabla inferior
      sangrado: [false, false, false],
      placa: [false, false, false],
      margen: ['', '', ''],
      sondaje: ['', '', ''],
      nota: ''
    };
  });
  return data;
}

// Configuración de posiciones de furcación para cada tabla
const furcationPositions = {
  // Primera imagen - Tabla superior (Vista Anterior)
  upperAnterior: {
    18: { x: -0.0, y: -38 },
    17: { x: -0.0, y: -24 },
    16: { x: -0.03, y: -23 },
    14: { x: 0.0, y: -18 },
    24: { x: -0.0, y: -22 },
    26: { x: 0.05, y: -23 },
    27: { x: -0.02, y: -25 },
    28: { x: 0.0, y: -38 },
  },
  // Primera imagen - Tabla inferior (Vista Posterior)
  upperPosterior: {
    18: [
      { x: -0.2, y: 36 },
      { x: 0.16, y: 40 }
    ],
    17: [
      { x: -0.18, y: 48 },
      { x: 0.25, y: 45 }
    ],
    16: [
      { x: -0.38, y: 45 },
      { x: 0.3, y: 45 }
    ],
    14: [
      { x: -0.25, y: 35 },
      { x: 0.25, y: 35 }
    ],
    24: [
      { x: -0.25, y: 35 },
      { x: 0.25, y: 35 }
    ],
    26: [
      { x: -0.25, y: 45 },
      { x: 0.38, y: 48 }
    ],
    27: [
      { x: -0.28, y: 45 },
      { x: 0.2, y: 45 }
    ],
    28: [
      { x: -0.16, y: 40 },
      { x: 0.2, y: 36 }
    ],
  },
  // Segunda imagen - Tabla superior (Vista Anterior)
  lowerAnterior: {
    48: { x: -0.2, y: -15 },
    47: { x: -0.1, y: -15 },
    46: { x: 0, y: -15 },
    44: { x: 0.1, y: -12 },
    34: { x: -0.1, y: -12 },
    36: { x: 0, y: -15 },
    37: { x: 0.1, y: -15 },
    38: { x: 0.2, y: -15 },
  },
  // Segunda imagen - Tabla inferior (Vista Posterior)
  lowerPosterior: {
    48: [
      { x: -0.2, y: -15 },
      { x: 0.2, y: -15 }
    ],
    47: [
      { x: -0.15, y: -15 },
      { x: 0.15, y: -15 }
    ],
    46: [
      { x: -0.1, y: -15 },
      { x: 0.1, y: -15 }
    ],
    44: [
      { x: -0.1, y: -12 },
      { x: 0.1, y: -12 }
    ],
    34: [
      { x: -0.1, y: -12 },
      { x: 0.1, y: -12 }
    ],
    36: [
      { x: -0.1, y: -15 },
      { x: 0.1, y: -15 }
    ],
    37: [
      { x: -0.15, y: -15 },
      { x: 0.15, y: -15 }
    ],
    38: [
      { x: -0.2, y: -15 },
      { x: 0.2, y: -15 }
    ],
  }
};

export default function PatientPeriodontogram() {
  const [teethUpper, setTeethUpper] = useState(initToothData()); // Para la parte superior de la primera imagen
  const [teethLower, setTeethLower] = useState(initToothData()); // Para la parte inferior de la primera imagen
  const [teeth2, setTeeth2] = useState(initToothData()); // Para la segunda imagen
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = document.querySelector('img[alt="Periodontograma"]');
    if (!img) return;

    const updateCanvas = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawReferenceGrid(ctx, canvas.width, canvas.height);

      // Dibujar para la mitad superior (Vista Anterior)
      upperTeeth.forEach((tooth, index) => {
        const pos = upperTeethPositions[index];
        const x = canvas.width * pos.start;
        const y = (canvas.height * 0.25) + 26;
        const width = canvas.width * pos.width;
        const height = canvas.height * 0.25;
        drawGingivalMargin(ctx, tooth, x, y, width, height, teethUpper);
        drawFurcation(ctx, tooth, x, y, width, height, teethUpper, 'upperAnterior');
      });

      // Dibujar para la mitad inferior (Vista Posterior)
      upperTeeth.forEach((tooth, index) => {
        const pos = lowerTeethPositions[index];
        const x = canvas.width * pos.start;
        const y = (canvas.height * 0.75) - 28;
        const width = canvas.width * pos.width;
        const height = canvas.height * 0.25;
        drawGingivalMargin(ctx, tooth, x, y, width, height, teethLower);
        drawFurcation(ctx, tooth, x, y, width, height, teethLower, 'upperPosterior');
      });
    };

    img.onload = updateCanvas;
    updateCanvas();

    return () => {
      img.onload = null;
    };
  }, [teethUpper, teethLower, showGrid]);

  // Modificar el segundo useEffect
  useEffect(() => {
    const canvas = canvasRef2.current;
    if (!canvas) return;

    const img = document.querySelector('img[alt="Periodontograma 2"]');
    if (!img) return;

    const updateCanvas = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawReferenceGrid(ctx, canvas.width, canvas.height);

      // Dibujar para dientes inferiores (segunda imagen - Vista Anterior)
      lowerTeeth.forEach((tooth, index) => {
        const pos = lowerTeethPositions2[index];
        const x = canvas.width * pos.start;
        const y = (canvas.height * 0.25) + 26;
        const width = canvas.width * pos.width;
        const height = canvas.height * 0.25;
        drawGingivalMargin(ctx, tooth, x, y, width, height, teeth2);
        drawFurcation(ctx, tooth, x, y, width, height, teeth2, 'lowerAnterior');
      });

      // Dibujar para dientes inferiores (segunda imagen - Vista Posterior)
      lowerTeeth.forEach((tooth, index) => {
        const pos = lowerTeethPositions2[index];
        const x = canvas.width * pos.start;
        const y = (canvas.height * 0.75) - 19;
        const width = canvas.width * pos.width;
        const height = canvas.height * 0.25;
        drawGingivalMargin(ctx, tooth, x, y, width, height, teeth2);
        drawFurcation(ctx, tooth, x, y, width, height, teeth2, 'lowerPosterior');
      });
    };

    img.onload = updateCanvas;
    updateCanvas();

    return () => {
      img.onload = null;
    };
  }, [teeth2, showGrid]);

  const handleChangeUpper = (tooth, field, value) => {
    setTeethUpper(prev => ({
      ...prev,
      [tooth]: { ...prev[tooth], [field]: value }
    }));
  };

  const handleChangeLower = (tooth, field, value) => {
    setTeethLower(prev => ({
      ...prev,
      [tooth]: { ...prev[tooth], [field]: value }
    }));
  };

  // Nueva función handleChange para el segundo estado
  const handleChange2 = (tooth, field, value) => {
    setTeeth2(prev => ({
      ...prev,
      [tooth]: { ...prev[tooth], [field]: value }
    }));
  };

  // Función para dibujar la cuadrícula y el margen gingival
  // Modificamos para aceptar el estado teeth como parámetro
  const drawGingivalMargin = (ctx, tooth, x, y, width, height, currentTeethState) => {
    // Usar el estado de dientes pasado como argumento
    const marginValues = currentTeethState[tooth].margen;
    const sondajeValues = currentTeethState[tooth].sondaje;
    const sectionWidth = width / 3;
    const scale = 6; // 1mm = 10px
    
    // Determinar si es un diente inferior
    const isLowerTooth = lowerTeeth.includes(tooth);

    // Puntos para el perfil del margen gingival (línea roja)
    const mgPoints = [];
    mgPoints.push({ x: x, y: y }); // Empezar desde el borde izquierdo

    marginValues.forEach((value, index) => {
      const sectionX = x + (sectionWidth * index);
      const nextSectionX = x + (sectionWidth * (index + 1));
      if (value) {
        const depth = parseInt(value) * scale;
        // Punto medio de la sección
        // La dirección del margen gingival depende de si es diente superior o inferior
        const mgY = isLowerTooth ? y - depth : y + depth; 
        mgPoints.push({ x: sectionX + (sectionWidth / 2), y: mgY });
      } else {
        // Si no hay valor, punto en el borde derecho de la sección (horizontal)
        mgPoints.push({ x: nextSectionX, y: y });
      }
    });
    mgPoints.push({ x: x + width, y: y }); // Terminar en el borde derecho

    // Dibujar perfil del margen gingival
    ctx.beginPath();
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 1;
    ctx.moveTo(mgPoints[0].x, mgPoints[0].y);
    for (let i = 1; i < mgPoints.length; i++) {
        ctx.lineTo(mgPoints[i].x, mgPoints[i].y);
    }
    ctx.stroke();

    // Puntos para el perfil de profundidad de sondaje (línea azul)
    const psPoints = [];
    // El primer punto de PS es igual al primer punto de MG (en la base)
    psPoints.push({ x: x, y: y });

    sondajeValues.forEach((value, index) => {
        const sectionX = x + (sectionWidth * index);
        const nextSectionX = x + (sectionWidth * (index + 1));
        // Usar el estado de dientes pasado como argumento para obtener marginValues
        const marginDepth = currentTeethState[tooth].margen[index] ? parseInt(currentTeethState[tooth].margen[index]) * scale : 0;

        if (value) {
            const sondajeDepth = parseInt(value) * scale;
            
            // Calcular la posición Y para el punto de sondaje (arriba o abajo del margen gingival)
            const psY = isLowerTooth ? 
                        y - marginDepth + sondajeDepth : // Si es diente inferior, bajar desde MG (sumar profundidad)
                        y + marginDepth - sondajeDepth;  // Si es diente superior, subir desde MG (restar profundidad)

            // El punto de PS se alinea horizontalmente con el punto de MG en el centro de la sección
            psPoints.push({ x: sectionX + (sectionWidth / 2), y: psY });

        } else {
             // Si no hay valor, mantener la línea horizontal a la altura de la línea base
             psPoints.push({ x: nextSectionX, y: y });
        }
    });
     // El último punto de PS es igual al último punto de MG (en la base)
    psPoints.push({ x: x + width, y: y });

    // Dibujar perfil de profundidad de sondaje
    ctx.beginPath();
    ctx.strokeStyle = '#0000FF';
    ctx.lineWidth = 1;
    ctx.moveTo(psPoints[0].x, psPoints[0].y);
     for (let i = 1; i < psPoints.length; i++) {
        ctx.lineTo(psPoints[i].x, psPoints[i].y);
    }
    ctx.stroke();

    // Sombreado entre margen gingival y sondaje
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.beginPath();
    
    // Dibujar el contorno usando los puntos de MG y PS
    ctx.moveTo(mgPoints[0].x, mgPoints[0].y);
    for (let i = 1; i < mgPoints.length; i++) {
        ctx.lineTo(mgPoints[i].x, mgPoints[i].y);
    }
    // Ahora conectar con los puntos de PS en orden inverso
     for (let i = psPoints.length - 1; i >= 0; i--) {
        ctx.lineTo(psPoints[i].x, psPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Función para dibujar la furcación
  const drawFurcation = (ctx, tooth, x, y, width, height, currentTeethState, tableType) => {
    const molarTeeth = {
      upperAnterior: [18, 17, 16, 14, 24, 26, 27, 28],
      upperPosterior: [18, 17, 16, 14, 24, 26, 27, 28],
      lowerAnterior: [48, 47, 46, 44, 34, 36, 37, 38],
      lowerPosterior: [48, 47, 46, 44, 34, 36, 37, 38]
    };

    if (!molarTeeth[tableType].includes(tooth)) return;

    // Obtener los valores de furcación según la tabla
    let furca1Value = '', furca2Value = '';
    if (tableType === 'upperPosterior' || tableType === 'lowerPosterior') {
      furca1Value = currentTeethState[tooth].furca2;
      furca2Value = currentTeethState[tooth].furca3;
    } else {
      furca1Value = currentTeethState[tooth].furca;
    }

    // Función auxiliar para dibujar el símbolo
    const drawSymbol = (ctx, x, y, value) => {
      const radius = 6;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      
      if (value === '1') {
        // Círculo vacío
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (value === '2') {
        // Círculo medio lleno (vertical)
        ctx.save();
        // Dibujar la mitad izquierda
        ctx.beginPath();
        ctx.arc(x, y, radius, -Math.PI/2, Math.PI/2);
        ctx.fillStyle = 'black';
        ctx.fill();
        // Dibujar el contorno completo
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      } else if (value === '3') {
        // Círculo lleno
        ctx.fillStyle = 'black';
        ctx.fill();
      }
    };

    // Posición central horizontal del diente
    const centerX = x + width / 2;
    
    // Obtener las posiciones de furcación según la tabla
    const positions = furcationPositions[tableType][tooth];
    if (!positions) return;

    // Si es un array, es doble furcación, si no, es simple
    const positionsArray = Array.isArray(positions) ? positions : [positions];

    // Dibujar cada furcación en su posición de manera independiente
    positionsArray.forEach((pos, index) => {
      const furcaX = centerX + (width * pos.x);
      const furcaY = y + pos.y;
      
      // Dibujar cada furcación independientemente
      if (index === 0) {
        drawSymbol(ctx, furcaX, furcaY, furca1Value);
      } else if (index === 1) {
        drawSymbol(ctx, furcaX, furcaY, furca2Value);
      }
    });
  };

  // Función para dibujar la cuadrícula de referencia
  const drawReferenceGrid = (ctx, width, height) => {
    if (!showGrid) return;
    
    ctx.beginPath();
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 0.5;

    // Solo líneas horizontales cada 10px (1mm)
    for (let y = 0; y < height; y += 10) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();
  };

  // Helpers para grids
  const inputGrid = (arr, onChange, color) => (
    <div className="flex gap-0.5 justify-center">
      {arr.map((v, i) => (
        <div
          key={i}
          onClick={() => onChange(i, !v)}
          className={`w-4 h-4 border rounded cursor-pointer transition 
            ${v ? color : "bg-gray-100 hover:bg-gray-200"}`}
        />
      ))}
    </div>
  );
  const numberGrid = (arr, onChange) => (
    <div className="flex gap-0.5 justify-center">
      {arr.map((v, i) => (
        <input
          key={i}
          type="number"
          value={v}
          onChange={e => onChange(i, e.target.value)}
          className="w-3 text-xs border rounded text-center px-0.5 py-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{ minWidth: 15 }}
          placeholder="-"
        />
      ))}
    </div>
  );

  function TeethTable({ arcada, teethState, handleChangeFunc, isUpperTable }) {
    const teethRow = arcada === "superior" ? upperTeeth : lowerTeeth;
    
    const rowOrder = [
      { label: "Movilidad", field: "movilidad", type: "cycle-select", options: ["", "1", "2", "3"] },
      { label: "Implante", field: "implante", type: "checkbox" },
      { label: "Furcación", field: "furca", type: "double-furca", options: ["", "1", "2", "3"], 
        showForTeeth: [18, 17, 16, 14, 24, 26, 27, 28] },
      { label: "Sangrado", field: "sangrado", type: "bool3", color: "bg-red-400" },
      { label: "Placa", field: "placa", type: "bool3", color: "bg-blue-400" },
      { label: "MG", field: "margen", type: "number3" },
      { label: "PS", field: "sondaje", type: "number3" },
    ];

    const displayedRows = isUpperTable ? rowOrder : [...rowOrder].reverse();

    const handleCycleSelect = (tooth, field, currentValue, options) => {
      const currentIndex = options.indexOf(currentValue);
      const nextIndex = (currentIndex + 1) % options.length;
      const nextValue = options[nextIndex];
      handleChangeFunc(tooth, field, nextValue);
    };

    const getFurcaSymbol = (value) => {
      if (value === undefined || value === null || value === '') return '-';
      switch (value) {
        case '1': return '○';
        case '2': return '◐';
        case '3': return '●';
        default: return '-';
      }
    };

    return (
      <table className="min-w-full border-separate border-spacing-y-1 table-fixed">
        <thead>
          <tr>
            <th className="bg-transparent"></th>
            {teethRow.map(n => (
              <th key={n} className="text-xs text-blue-800 font-bold py-1 border-x border-gray-200">{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row) => (
            <tr key={row.label}>
              <td className="text-right pr-1 text-gray-600 text-xs">{row.label}</td>
              {teethRow.map(n => (
                <td key={n} className="text-center border-x border-gray-200">
                  {row.type === "double-furca" && (!row.showForTeeth || row.showForTeeth.includes(n)) && (
                    <div className="flex gap-1 justify-center">
                      {/* Para la tabla superior (anterior): controla .furca */}
                      {isUpperTable ? (
                        <div
                          className="w-8 h-6 text-base border rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                          onClick={() => handleCycleSelect(n, 'furca', teethState[n].furca, row.options)}
                        >
                          {getFurcaSymbol(teethState[n].furca)}
                        </div>
                      ) : (
                        <>
                          {/* Para la tabla inferior (posterior): controla .furca2 y .furca3 */}
                          <div
                            className="w-8 h-6 text-base border rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                            onClick={() => handleCycleSelect(n, 'furca2', teethState[n].furca2, row.options)}
                          >
                            {getFurcaSymbol(teethState[n].furca2)}
                          </div>
                          <div
                            className="w-8 h-6 text-base border rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100"
                            onClick={() => handleCycleSelect(n, 'furca3', teethState[n].furca3, row.options)}
                          >
                            {getFurcaSymbol(teethState[n].furca3)}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {row.type === "double-furca" && row.showForTeeth && !row.showForTeeth.includes(n) && (
                    <div className="w-20 h-6"></div>
                  )}
                  {row.type === "cycle-select" && row.field !== "furca" && (!row.showForTeeth || row.showForTeeth.includes(n)) && (
                    <div
                      className="w-10 h-6 text-xs border rounded flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 mx-auto"
                      onClick={() => handleCycleSelect(n, row.field, teethState[n][row.field], row.options)}
                    >
                      {teethState[n][row.field] || "-"}
                    </div>
                  )}
                  {row.type === "cycle-select" && row.field !== "furca" && row.showForTeeth && !row.showForTeeth.includes(n) && (
                    <div className="w-10 h-6"></div>
                  )}
                  {row.type === "checkbox" && (
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={teethState[n][row.field]}
                        onChange={e => handleChangeFunc(n, row.field, e.target.checked)}
                        className="w-4 h-4 accent-blue-500"
                      />
                    </div>
                  )}
                  {row.type === "bool3" && inputGrid(
                    teethState[n][row.field],
                    (i, val) => {
                      const arr = [...teethState[n][row.field]];
                      arr[i] = val;
                      handleChangeFunc(n, row.field, arr);
                    },
                    row.color
                  )}
                  {row.type === "number3" && numberGrid(
                    teethState[n][row.field],
                    (i, val) => {
                      const arr = [...teethState[n][row.field]];
                      arr[i] = val;
                      handleChangeFunc(n, row.field, arr);
                    }
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // Mapa aproximado para números sobre los dientes (ajusta top/left a tu imagen)
  const toothNumberPosition = {
    ...Object.fromEntries(upperTeeth.map((n, i) => [n, { top: "3%", left: `${3 + i * 6}%` }])),
    ...Object.fromEntries(lowerTeeth.map((n, i) => [n, { top: "97%", left: `${3 + i * 6}%` }]))
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4 bg-gray-50">
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div className="w-full mx-auto px-1 md:px-4">
        <div className="overflow-x-auto rounded-lg bg-white p-4 shadow border">
          <h2 className="text-lg font-bold text-center mb-4">Periodontograma - Vista Anterior/Posterior</h2>

          <h3 className="text-md font-semibold text-blue-800 mb-2">Dientes Superiores (Vista Anterior)</h3>
          <TeethTable arcada="superior" teethState={teethUpper} handleChangeFunc={handleChangeUpper} isUpperTable={true} />
          <div className="relative flex justify-center my-2">
            <img
              src={periodontogramImage}
              alt="Periodontograma"
              className="w-full bg-white rounded-xl shadow border"
              draggable={false}
            />
            <canvas
              id="periodontogramCanvas"
              className="absolute top-0 left-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
              ref={canvasRef}
            />
            {/* Overlay de números - Primera imagen (solo dientes superiores) */}
            {upperTeeth.map((n, i) => {
              const toothPos = upperTeethPositions[i];
              const centerX = (toothPos.start + (toothPos.width / 2)) * 100;
              
              return (
                <React.Fragment key={n}>
                  {/* Número superior */}
                  <span
                    style={{
                      position: "absolute",
                      top: "3%",
                      left: `${centerX}%`,
                      transform: "translate(-50%, -50%)",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#2233aa",
                      textShadow: "0 1px 4px #fff"
                    }}
                    pointerEvents="none"
                  >{n}</span>
                  {/* Número inferior */}
                  <span
                    style={{
                      position: "absolute",
                      top: "97%",
                      left: `${centerX}%`,
                      transform: "translate(-50%, -50%)",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#2233aa",
                      textShadow: "0 1px 4px #fff"
                    }}
                    pointerEvents="none"
                  >{n}</span>
                </React.Fragment>
              );
            })}
          </div>
          <h3 className="text-md font-semibold text-blue-800 mt-4 mb-2">Dientes Superiores (Vista Posterior)</h3>
          <TeethTable arcada="superior" teethState={teethLower} handleChangeFunc={handleChangeLower} isUpperTable={false} />
        </div>
      </div>

      <div className="w-full mx-auto px-1 md:px-4 mt-8">
         <div className="overflow-x-auto rounded-lg bg-white p-4 shadow border">
            <h2 className="text-lg font-bold text-center mb-4">Periodontograma - Segunda Vista (Ajustar Título)</h2>

            <h3 className="text-md font-semibold text-blue-800 mb-2">Dientes Inferiores (Vista Anterior)</h3>
            <TeethTable arcada="inferior" teethState={teeth2} handleChangeFunc={handleChange2} isUpperTable={true} />
            <div className="relative flex justify-center my-2">
              <img
                src={periodontogramImage2}
                alt="Periodontograma 2"
                className="w-full bg-white rounded-xl shadow border"
                draggable={false}
              />
              <canvas
                id="periodontogramCanvas2"
                className="absolute top-0 left-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
                ref={canvasRef2}
              />
              {/* Overlay de números - Segunda imagen (solo dientes inferiores) */}
              {lowerTeeth.map((n, i) => {
                const toothPos = lowerTeethPositions2[i];
                const centerX = (toothPos.start + (toothPos.width / 2)) * 100;
                
                return (
                  <React.Fragment key={n}>
                    {/* Número superior */}
                    <span
                      style={{
                        position: "absolute",
                        top: "3%",
                        left: `${centerX}%`,
                        transform: "translate(-50%, -50%)",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#2233aa",
                        textShadow: "0 1px 4px #fff"
                      }}
                      pointerEvents="none"
                    >{n}</span>
                    {/* Número inferior */}
                    <span
                      style={{
                        position: "absolute",
                        top: "97%",
                        left: `${centerX}%`,
                        transform: "translate(-50%, -50%)",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#2233aa",
                        textShadow: "0 1px 4px #fff"
                      }}
                      pointerEvents="none"
                    >{n}</span>
                  </React.Fragment>
                );
              })}
            </div>
            <h3 className="text-md font-semibold text-blue-800 mt-4 mb-2">Dientes Inferiores (Vista Posterior)</h3>
            <TeethTable arcada="inferior" teethState={teeth2} handleChangeFunc={handleChange2} isUpperTable={false} />
        </div>
      </div>

      <div className="w-full mx-auto px-1 md:px-4 mt-8 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Guardar / Exportar Datos (Funcionalidad Pendiente)
          </button>
      </div>

    </div>
  );
}
