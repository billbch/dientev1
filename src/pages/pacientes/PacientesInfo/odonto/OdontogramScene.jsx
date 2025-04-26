import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import  {ToothModel}  from './ToothModel';
import { Suspense, useState } from 'react';
import ToothDetails from './ToothDetails';

const OdontogramScene = () => {
  const [selectedTooth, setSelectedTooth] = useState(null);

  const handleToothClick = (toothId) => {
    setSelectedTooth(toothId);
  };

  return (
    <div className="flex gap-6">
      {/* Contenedor del odontograma */}
      <div className="flex-1 h-[600px] bg-gray-100 rounded-lg overflow-hidden">
        <Canvas shadows camera={{
          position: [0, 0, 5],
          fov: 40
        }}>
          <Suspense fallback={null}>
            {/* Iluminación básica */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, 10, -10]} intensity={0.8} />

            {/* Modelo 3D */}
            <ToothModel 
              position={[0, -1, 0]}
              onClick={handleToothClick}
              selectedTooth={selectedTooth}
            />

            {/* Controles de cámara */}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              target={[0, -1, 0]}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI * 3/4}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Panel de detalles del diente */}
      <div className={`w-96 transition-all duration-300 ${selectedTooth ? 'opacity-100' : 'opacity-0 w-0'}`}>
        {selectedTooth && (
          <ToothDetails 
            toothId={selectedTooth}
            onClose={() => setSelectedTooth(null)}
          />
        )}
      </div>
    </div>
  );
};

export default OdontogramScene; 