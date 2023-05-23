import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/coffee/vertex.glsl";
import fragmentShader from "../shaders/coffee/fragment.glsl";

type backgroundAnimationProps = {
  rotation?: number[];
  position?: number[];
  amplify?: number;
  depthColor?: string;
  surfaceColor?: string;
  moveSpeed?: number;
};

export default function Coffee({
  rotation,
  position,
  amplify,
  depthColor,
  surfaceColor,
  moveSpeed,
}: backgroundAnimationProps) {
  const ref =
    useRef<
      THREE.Points<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    >(null);

  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.PlaneGeometry(6, 6, 40, 40);
    const positions: Float32Array = Float32Array.from(
      (planeGeometry.attributes.position as THREE.BufferAttribute).array
    );

    return positions;
  }, []);

  const sizeAttribute = useMemo(() => {
    const size: Float32Array = new Float32Array(planePositions.length / 3);
    size.forEach((_val, index) => {
      size[index] = (Math.random() - 0.5) * 10;
    });

    return size;
  }, [planePositions]);

  const randomNessAttribute = useMemo(() => {
    const randomness: Float32Array = new Float32Array(
      planePositions.length / 3
    );
    randomness.forEach((_val, index) => {
      randomness[index] = Math.abs(Math.random() - 0.5) / 20;
    });

    return randomness;
  }, [planePositions]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },

        // 波関連
        uAmplify: { value: amplify ? Math.sin(amplify) : 1 },
        uCenter: { value: new THREE.Vector2(0, 0) },
        uElevation: { value: 0.1 },
        uFrequency: { value: new THREE.Vector2(1.0, 1.0) },
        uSpeed: { value: moveSpeed },

        //色関連
        uDepthColor: {
          value: new THREE.Color(depthColor ? depthColor : "blue"),
        },
        uSurfaceColor: {
          value: new THREE.Color(surfaceColor ? surfaceColor : "lightgreen"),
        },
      },
    }),
    [amplify, depthColor, surfaceColor, moveSpeed]
  );

  useFrame(() => {
    shaderArgs.uniforms.uTime.value++;
    if (ref.current) {
      ref.current.rotation.z -= 0.005;
    }
  });

  return (
    <>
      <points
        ref={ref}
        rotation={rotation ? new THREE.Euler(...rotation) : undefined}
        position={
          position ? new THREE.Vector3(...position) : new THREE.Vector3()
        }
        scale={0.13}
      >
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={planePositions}
            itemSize={3}
            count={planePositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            array={sizeAttribute}
            itemSize={1}
            count={sizeAttribute.length}
          />
          <bufferAttribute
            attach="attributes-aRandomness"
            array={randomNessAttribute}
            itemSize={1}
            count={randomNessAttribute.length}
          />
        </bufferGeometry>

        <shaderMaterial
          args={[shaderArgs]}
          transparent
          depthTest={true}
          depthWrite={false}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </>
  );
}
