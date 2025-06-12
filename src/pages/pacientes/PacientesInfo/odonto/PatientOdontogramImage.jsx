// PatientOdontogramImage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import odontogramaImage from '../../../../images/odontograma2.png';

const treatmentIcons = {
  "Amalgama desadaptada": { icon: "○", color: "#0000FF", borderColor: "#FF0000" },
  "Fractura": { icon: "⚡", color: "#AF0000" },
  "Corona buena": { icon: "⬤", color: "#0000FF" },
  "Perno bueno": { icon: "⚪", color: "#FFFFFF", borderColor: "#000000" },
  "Prótesis": { icon: "⬤", color: "#FFD700" },
  "Resina adaptada": { icon: "⬤", color: "#00FF00" },
  "Diente ausente": { icon: "✕", color: "#FF0000" },
  "Corona desad": { icon: "⬤", color: "#FFFFFF", borderColor: "#FF0000" },
  "Perno malo": { icon: "⚪", color: "#FF0000", borderColor: "#000000" },
  "Otros": { icon: "?", color: "#FF0000" },
  "Resina desadaptada": { icon: "⬤", color: "#FF0000", borderColor: "#000000" },
  "Amalgama adaptada": { icon: "⬤", color: "#0000FF" },
  "Sellante bueno": { icon: "S", color: "#800080" },
  "Sellante desadaptado": { icon: "S", color: "#FF0000", borderColor: "#000000" },
  "Extracción indicada": { icon: "X", color: "#FF0000" },
  "Endodoncia buena": { icon: "≡", color: "#0000FF" },
  "Endodoncia mala": { icon: "≡", color: "#FF0000" },
  "Implante bueno": { icon: "▲", color: "#0000FF" },
  "Implante malo": { icon: "▲", color: "#FF0000" }
};

const DrawingControls = ({ selectedColor, setSelectedColor, isDrawingMode, setIsDrawingMode, onUndo }) => {
  const colors = [
    { name: 'Rojo', value: '#FF0000' },
    { name: 'Azul', value: '#0000FF' },
    { name: 'Negro', value: '#000000' }
  ];
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex space-x-2">
        {colors.map(color => (
          <button
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color.value ? 'border-blue-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsDrawingMode(true)}
          className={`px-4 py-2 rounded ${
            isDrawingMode 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Modo Dibujo
        </button>
        <button
          onClick={() => setIsDrawingMode(false)}
          className={`px-4 py-2 rounded ${
            !isDrawingMode 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Modo Selección
        </button>
        <button
          onClick={onUndo}
          disabled={!isDrawingMode}
          className={`px-4 py-2 rounded flex items-center space-x-1 ${
            isDrawingMode 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          title="Deshacer último trazo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Deshacer</span>
        </button>
      </div>
    </div>
  );
};

const ToothPanel = ({ selectedTooth, setTreatment, onClose }) => {
  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', opacity: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  };
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto"
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
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(treatmentIcons).map(([treatment, { icon, color, borderColor }]) => (
            <button
              key={treatment}
              onClick={() => setTreatment(selectedTooth, treatment)}
              className="flex items-center justify-center p-2 rounded border hover:bg-gray-50 transition-colors"
              style={{
                borderColor: borderColor || color,
                color: color
              }}
            >
              <span className="text-xl mr-2">{icon}</span>
              <span className="text-sm">{treatment}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PatientOdontogramImage = () => {
  // Restauramos el estado local para controlar la visualización del panel y los tratamientos
  const [selectedTooth, setSelectedTooth] = useState(null); // Usar estado local
  const [showPanel, setShowPanel] = useState(false);
  const [toothTreatments, setToothTreatments] = useState({});
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [strokes, setStrokes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const currentStrokeRef = useRef(null);

  // Configurar el canvas cuando se monta el componente
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    // Esperar a que la imagen se cargue
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      redrawStrokes();
    };
    // Asegurarse de dibujar si la imagen ya está cargada (ej. en re-renders)
    if (img.complete) {
        // Añadir un pequeño retardo para asegurar que el canvas esté listo después del render inicial
        setTimeout(redrawStrokes, 0);
    }
  }, [strokes]); // Dependencia en strokes para redibujar al añadir un trazo

  // Redibujar todos los trazos y los límites de los dientes
  const redrawStrokes = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    // Vamos a redibujar la imagen cada vez para simplificar la lógica de borrado/redibujado de trazos
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Dibuja los límites de los dientes basados en teethMap (líneas rojas)
    ctx.strokeStyle = '#FF0000'; // Color rojo
    ctx.lineWidth = 1; // Grosor de la línea
    ctx.setLineDash([5, 5]); // Líneas discontinuas (opcional, puedes quitar si prefieres sólidas)

    teethMap.forEach(tooth => {
        // Convertir porcentajes a píxeles absolutos
        const x = (parseFloat(tooth.left) / 100) * canvas.width;
        const y = (parseFloat(tooth.top) / 100) * canvas.height;
        const width = (parseFloat(tooth.width) / 100) * canvas.width;
        // Asumiendo que la altura para cada fila de dientes es el 50% de la altura total de la imagen
        const height = canvas.height * 0.5;

        // Dibuja el rectángulo para el diente
        ctx.strokeRect(x, y, width, height);
    });

    ctx.setLineDash([]); // Restablecer a líneas sólidas para los trazos del usuario

    // Dibujar todos los trazos guardados
    strokes.forEach(stroke => {
      if (!stroke || !stroke.color || !Array.isArray(stroke.points) || stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      stroke.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      ctx.stroke();
    });

    // Dibujar el trazo actual si existe (solo si estamos dibujando)
    if (isDrawing && currentStrokeRef.current && currentStrokeRef.current.points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = currentStrokeRef.current.color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const points = currentStrokeRef.current.points;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
  };

  // Manejo de eventos del mouse (adaptados para dibujar solo si isDrawingMode es true)
  const handleMouseDown = (e) => {
    if (!isDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    currentStrokeRef.current = {
      color: selectedColor,
      points: [{ x, y }]
    };
     // Dibujar el punto inicial inmediatamente
     redrawStrokes();
  };

  const handleMouseMove = (e) => {
    if (!isDrawingMode || !isDrawing || !currentStrokeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    currentStrokeRef.current.points.push({ x, y });
    redrawStrokes();
  };

  const handleMouseUp = () => {
    if (!isDrawingMode || !isDrawing) return;

    if (currentStrokeRef.current && currentStrokeRef.current.points.length > 1) {
      const newStroke = { ...currentStrokeRef.current };
      setStrokes(prev => [...prev, newStroke]);
    } else if (currentStrokeRef.current && currentStrokeRef.current.points.length === 1) {
        // Si solo hay un punto, no es un trazo, descartar o manejar como clic de punto si se desea
        // Por ahora, simplemente descartamos
    }

    setIsDrawing(false);
    currentStrokeRef.current = null; // Limpiar el trazo actual
     // Asegurarse de que el estado ha sido actualizado antes de redibujar
     // redrawStrokes() se llama automáticamente por la dependencia en 'strokes' si se añade un nuevo stroke
  };

  const handleMouseLeave = () => {
    // Si el mouse sale del canvas mientras se dibuja, finalizar el trazo
    if (isDrawingMode && isDrawing) {
      handleMouseUp();
    }
  };

  // Manejo de clics en dientes (solo si NO estamos en modo dibujo)
  const handleToothClick = (toothNumber) => {
      if (!isDrawingMode) { // Solo permitir clics si NO estamos dibujando
          setSelectedTooth(toothNumber); // Usar estado local
          setShowPanel(true); // Mostrar panel
      }
  };

  const handleClosePanel = () => {
    setSelectedTooth(null); // Limpiar estado local
    setShowPanel(false); // Ocultar panel
  };

  const setTreatment = (toothNumber, treatment) => {
    setToothTreatments(prev => ({ ...prev, [toothNumber]: treatment }));
    // Podrías cerrar el panel después de seleccionar un tratamiento
    // handleClosePanel();
  };

   const handleUndo = () => {
       if (!isDrawingMode || strokes.length === 0) return; // Solo deshacer en modo dibujo
       setStrokes(prev => prev.slice(0, -1));
       // Redibujar se llama automáticamente por la dependencia en 'strokes'
   };

  // Función para renderizar el ícono del tratamiento sobre el diente
  const renderTreatmentIcon = (toothNumber) => {
      const treatment = toothTreatments[toothNumber];
      if (!treatment || !treatmentIcons[treatment]) return null;

      const { icon, color } = treatmentIcons[treatment];

      // Buscar la posición del diente en teethMap
      const toothData = teethMap.find(tooth => tooth.id === toothNumber);

      // Si no se encuentra el diente o no hay datos de posición, no renderizar
      if (!toothData) return null;

      // Obtener las posiciones left y top, y el width del diente como números
      const toothLeft = parseFloat(toothData.left);
      const toothWidth = parseFloat(toothData.width);
      const toothTop = parseFloat(toothData.top);

      // Calcular el centro horizontal del diente en porcentaje
      let centerX = 50;
      let centerY;

      // Aplicar una lógica de posición diferente para dientes inferiores (IDs 31-48)
      if (toothNumber >= 31 && toothNumber <= 48) {
          // Lógica para dientes inferiores
          // Ajustamos la posición vertical ligeramente diferente, por ejemplo, 55% en lugar de 50% sumado al top
          centerY =  30; // Puedes ajustar este valor (55) según necesites
          // Si necesitas ajustar horizontalmente también, podrías hacer algo como:
          // centerX = toothLeft + (toothWidth / 2) + 2; // Mover 2% a la derecha, por ejemplo

      } else {
          // Lógica para dientes superiores (o cualquier otro caso no especificado)
          centerY = toothTop + 27; // Mantener la lógica anterior para superiores
          // centerX se calcula igual para superiores en este ejemplo
      }

      return (
          <div
              key={`treatment-${toothNumber}`}
              style={{
                  position: 'absolute',
                  // Usar las posiciones calculadas (ajustadas si es necesario para inferiores)
                  left: `${centerX}%`,
                  top: `${centerY}%`,
                  color: color,
                  fontSize: '20px', // Ajustar tamaño si es necesario
                  transform: 'translate(-50%, -50%)', // Centrar el ícono respecto a su propio punto de origen
                  pointerEvents: 'none' // No interferir con clics en el canvas
              }}
          >
              {icon}
          </div>
      );
  };

  // Mapa de posiciones de los dientes en la imagen (necesitas definirlo correctamente)
  // ESTO DEBE COINCIDIR CON LA IMAGEN odontograma2.png
  const teethMap = [
    { id: 18, top: '0%', left: '0%',    width: '7.4%' },
    { id: 17, top: '0%', left: '7.3%',  width: '7.4%' },
    { id: 16, top: '0%', left: '14.6%', width: '8%' },
    { id: 15, top: '0%', left: '22.5%', width: '5.2%' },
    { id: 14, top: '0%', left: '27.6%', width: '5.2%' },
    { id: 13, top: '0%', left: '32.7%', width: '6.5%' },
    { id: 12, top: '0%', left: '39%',   width: '5.0%' },
    { id: 11, top: '0%', left: '43.9%', width: '6.2%' },
    { id: 21, top: '0%', left: '50%',   width: '6.2%' },
    { id: 22, top: '0%', left: '56.1%', width: '4.8%' },
    { id: 23, top: '0%', left: '60.8%', width: '6.4%' },
    { id: 24, top: '0%', left: '67.1%', width: '5.2%' },
    { id: 25, top: '0%', left: '72.2%', width: '5.5%' },
    { id: 26, top: '0%', left: '77.6%', width: '8.2%' },
    { id: 27, top: '0%', left: '85.7%', width: '6.9%' },
    { id: 28, top: '0%', left: '92.5%', width: '7.5%' },
    { id: 48, top: '50%', left: '0.00%', width: '7.4%' },
    { id: 47, top: '50%', left: '7.3%',  width: '7.4%' },
    { id: 46, top: '50%', left: '14.6%', width: '8%' },
    { id: 45, top: '50%', left: '22.5%', width: '5.2%' },
    { id: 44, top: '50%', left: '27.6%', width: '5.2%' },
    { id: 43, top: '50%', left: '32.7%', width: '6.5%' },
    { id: 42, top: '50%', left: '39.0%', width: '5.0%' },
    { id: 41, top: '50%', left: '43.9%', width: '6.2%' },
    { id: 31, top: '50%', left: '50.0%', width: '6.2%' },
    { id: 32, top: '50%', left: '56.1%', width: '4.8%' },
    { id: 33, top: '50%', left: '60.8%', width: '6.4%' },
    { id: 34, top: '50%', left: '67.1%', width: '5.2%' },
    { id: 35, top: '50%', left: '72.2%', width: '5.5%' },
    { id: 36, top: '50%', left: '77.6%', width: '8.2%' },
    { id: 37, top: '50%', left: '85.7%', width: '6.9%' },
    { id: 38, top: '50%', left: '92.5%', width: '7.5%' },
  ];

  return (
    <div className="overflow-x-auto rounded-lg bg-white p-4 shadow border">

        <DrawingControls
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            isDrawingMode={isDrawingMode}
            setIsDrawingMode={setIsDrawingMode}
            onUndo={handleUndo}
         />

        <div className="relative flex justify-center my-2">
            <img
              src={odontogramaImage}
              alt="Odontograma"
              ref={imageRef}
              className="w-full bg-white rounded-xl shadow border"
              draggable={false}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ pointerEvents: isDrawingMode ? 'auto' : 'none' }}
            />

            {!isDrawingMode && (
               <div
                 className="absolute top-0 left-0 w-full h-full"
                 style={{ zIndex: 2, pointerEvents: 'auto' }}
               >
                 {teethMap.map((tooth) => (
                   <div
                     key={tooth.id}
                     style={{
                       position: 'absolute',
                       top: tooth.top,
                       left: tooth.left,
                       width: tooth.width,
                       height: '50%',
                     }}
                     className={`cursor-pointer ${selectedTooth === tooth.id ? 'bg-blue-200 bg-opacity-50 rounded-md' : ''}`}
                     onClick={() => handleToothClick(tooth.id)}
                   >
                     {toothTreatments[tooth.id] && renderTreatmentIcon(tooth.id)}
                   </div>
                 ))}
               </div>
            )}

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
