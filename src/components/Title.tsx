import { Center, SpotLight, Text3D } from "@react-three/drei";
import * as THREE from "three";

export default function Title() {
  const lightY = 5;
  const position = [-3.5, 0.2, 1];
  const lightPosition = [position[0], lightY, position[2]];

  const lightTargetObj = new THREE.Object3D();
  lightTargetObj.position.set(...(position as [number, number, number]));

  return (
    <>
      <SpotLight
        castShadow
        penumbra={1.5}
        distance={10}
        angle={0.2}
        attenuation={3}
        anglePower={10}
        intensity={1}
        shadowCameraFov={undefined}
        shadowCameraLeft={undefined}
        shadowCameraRight={undefined}
        shadowCameraTop={undefined}
        shadowCameraBottom={undefined}
        shadowCameraNear={undefined}
        shadowCameraFar={undefined}
        shadowBias={undefined}
        shadowMapWidth={undefined}
        shadowMapHeight={undefined}
        position={
          position ? new THREE.Vector3(...lightPosition) : new THREE.Vector3()
        }
        target={lightTargetObj}
      />
      <Center
        position={
          position ? new THREE.Vector3(...position) : new THREE.Vector3()
        }
      >
        <Text3D
          castShadow={true}
          curveSegments={5}
          bevelEnabled
          bevelSize={0.01}
          bevelThickness={0.1}
          height={0.1}
          lineHeight={0.1}
          letterSpacing={-0.06}
          size={0.3}
          font="/Inter_Bold.json"
          rotation={[-Math.PI / 6, 0.5, 0.2]}
        >
          My Portfolio
          <meshStandardMaterial color="#f09030" />
        </Text3D>
      </Center>
    </>
  );
}
