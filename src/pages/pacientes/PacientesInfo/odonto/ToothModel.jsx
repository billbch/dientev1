import { useGLTF } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

export function ToothModel({ onClick, isSelected, position = [0, -1, 0], onToothSelect }) {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/boca.glb');
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedTooth, setSelectedTooth] = useState(null);
  
  // Mantener un registro de las escalas originales de los dientes
  const originalScales = useRef(new Map());
  
  // Configuración de tamaños y animación
  const BASE_MODEL_SCALE = 0.03;  // Tamaño base del modelo (era 0.02)
  const HOVER_SCALE = 1.01;      // Cuánto crece al hacer hover (1.1 = 10% más grande)
  const ANIMATION_SPEED = 0.1;   // Velocidad de la animación (0.1 = suave, más alto = más rápido)

  // Animación para el modelo completo
  const modelSpring = useSpring({
    scale: selectedTooth ? 0.015 : 0.02,
    position: selectedTooth ? [position[0] - 2, position[1], position[2]] : position,
    rotation: selectedTooth ? [0.2, 0, 0] : [0.2, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  // Animación para el diente seleccionado
  const toothSpring = useSpring({
    scale: selectedTooth ? 0.03 : 0.02,
    position: selectedTooth ? [2, position[1], position[2]] : position,
    rotation: selectedTooth ? [0.2, Math.PI, 0] : [0.2, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  // Material para los dientes
  const teethMaterial = new THREE.MeshStandardMaterial({
    color: '#F2F2F2',
    metalness: 0.1,
    roughness: 0.3,
    envMapIntensity: 1
  });

  // Material para las encías
  const gumsMaterial = new THREE.MeshStandardMaterial({
    color: '#FF9E9E',
    metalness: 0.1,
    roughness: 0.6,
    envMapIntensity: 0.5
  });

  // Material para dientes resaltados
  const highlightMaterial = new THREE.MeshStandardMaterial({
    color: '#E5E5E5',
    metalness: 0.2,
    roughness: 0.2,
    envMapIntensity: 1.2
  });

  // Aplicar materiales y efectos visuales
  scene?.traverse((child) => {
    if (child.isMesh) {
      // Guardar la escala original si aún no está guardada
      if (!originalScales.current.has(child.name)) {
        originalScales.current.set(child.name, child.scale.clone());
      }

      // Determinar si es encía basado en el nombre del mesh
      const isGum = child.name.toLowerCase().includes('gum') || 
                    child.name.toLowerCase().includes('encia');
      
      // Aplicar material correspondiente
      child.material = isGum ? gumsMaterial.clone() : teethMaterial.clone();
      
      // Si es un diente, añadir interactividad
      if (!isGum) {
        child.userData.isInteractive = true;
        child.userData.isGum = false;
        
        // Si está seleccionado, aplicar material de resaltado
        if (child.name === hoveredArea) {
          child.material = highlightMaterial.clone();
        }
      } else {
        child.userData.isGum = true;
      }
    }
  });

  // Usar useFrame para animar suavemente la escala
  useFrame(() => {
    scene?.traverse((child) => {
      if (child.isMesh && child.userData.isInteractive) {
        const originalScale = originalScales.current.get(child.name);
        const targetScale = child.name === hoveredArea ? HOVER_SCALE : 1;
        
        // Interpolar suavemente la escala actual hacia la escala objetivo
        child.scale.x = THREE.MathUtils.lerp(child.scale.x, originalScale.x * targetScale, ANIMATION_SPEED);
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, originalScale.y * targetScale, ANIMATION_SPEED);
        child.scale.z = THREE.MathUtils.lerp(child.scale.z, originalScale.z * targetScale, ANIMATION_SPEED);
      }
    });
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    // Solo resaltar si es un diente
    if (e.object.userData.isInteractive && !e.object.userData.isGum) {
      setHoveredArea(e.object.name);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    setHoveredArea(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.object.userData.isInteractive && !e.object.userData.isGum) {
      if (onClick) {
        onClick(e.object.name);
      }
    }
  };

  return (
    <>
      <animated.primitive
        ref={modelRef}
        object={scene}
        position={position}
        scale={BASE_MODEL_SCALE}
        {...modelSpring}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      
      {selectedTooth && (
        <animated.primitive
          object={scene}
          {...toothSpring}
        />
      )}
    </>
  );
} 