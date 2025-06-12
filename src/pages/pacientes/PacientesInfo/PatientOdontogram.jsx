import React, { useState } from 'react';
// Eliminamos la importación de PatientOdontogram3D ya que no la usaremos directamente aquí
// import PatientOdontogram3D from './odonto/PatientOdontogram3D'
import PatientOdontogramImage from './odonto/PatientOdontogramImage';

const PatientOdontogram = () => {
  // Eliminamos el estado de viewMode y los botones de selección
  // const [viewMode, setViewMode] = useState('3d');
  const [selectedTooth, setSelectedTooth] = useState(null); // Mantener si PatientOdontogramImage lo necesita o si se planea pasar props

  return (
    // Usamos el mismo contenedor principal que en Periodontogram.jsx para consistencia
    <div className="w-full flex flex-col items-center gap-4 py-4 bg-gray-50">

      {/* Título principal del odontograma con el mismo estilo que en Periodontogram.jsx */}
      <h2 className="text-lg font-bold text-center mb-4">Odontograma</h2>

      {/* Contenedor para la sección principal (imagen y controles) */}
      <div className="w-full mx-auto px-1 md:px-4">
         <div className="overflow-x-auto rounded-lg bg-white p-4 shadow border"> {/* Estilo de tarjeta */}
            {/* Renderizamos directamente el componente de la imagen del odontograma */}
            {/* Si PatientOdontogramImage necesita props como selectedTooth/setSelectedTooth, pásalas aquí */}
            <PatientOdontogramImage selectedTooth={selectedTooth} setSelectedTooth={setSelectedTooth} />
         </div>
      </div>

      {/* Sección de Acciones Adicionales (Botón Guardar/Exportar) con el mismo estilo y comentarios */}
      <div className="w-full mx-auto px-1 md:px-4 mt-8 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Guardar / Exportar Datos (Funcionalidad Pendiente)
          </button>
          {/* Aquí podrías añadir otros botones para funcionalidades como 'Exportar a PDF', etc. */}
          {/* La lógica para guardar o exportar datos iría en una función que se llame al hacer clic en el botón. */}
          {/* Esta función debería: */}
          {/* 1. Acceder a los datos relevantes del Odontograma (trazos de dibujo, tratamientos seleccionados, etc.). */}
          {/* 2. Formatear estos datos (por ejemplo, a JSON o un formato personalizado). */}
          {/* 3. Decidir si se guarda (enviar a un backend) o se exporta (crear un archivo descargable). */}
          {/* Ejemplo básico de cómo acceder a algunos datos (asumiendo que se pasen como props a PatientOdontogramImage): */}
          {/* const odontogramData = { treatments: toothTreatments, strokes: drawingStrokes }; // Necesitarías obtener estos datos */}
          {/* console.log(JSON.stringify(odontogramData, null, 2)); // Ejemplo: mostrar datos en consola */}
      </div>

    </div>
  );
};

export default PatientOdontogram;
