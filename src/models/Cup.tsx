import { useFrame } from "@react-three/fiber";
import useLoadGltf from "../hooks/useLoadGltf";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { SpotLight } from "@react-three/drei";
import Coffee from "./Coffee";

export default function Cup() {
  const obj = useLoadGltf("/Cup.glb");
  const textMesh = obj.scene.children.find(
    (mesh) => mesh.name === "Text001"
  ) as THREE.Mesh;

  useFrame((_state) => {
    //テキストを発酵させる
    if (textMesh) {
      const material = textMesh.material as THREE.MeshStandardMaterial;
      material.emissive = new THREE.Color("#ff0000");
      material.emissiveIntensity = Math.sin(_state.clock.elapsedTime / 2) + 0.2;
    }
  });

  const lightTargetObj = new THREE.Object3D();
  lightTargetObj.position.set(2.5, 1, 2.5);

  return (
    <>
      <RigidBody>
        <mesh
          position={[2.5, 0, 2.5]}
          scale={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={obj.scene} scale={[0.5, 0.5, 0.5]} castShadow />
        </mesh>
      </RigidBody>
      <SpotLight
        castShadow
        penumbra={1}
        distance={10}
        angle={0.15}
        attenuation={0}
        anglePower={0}
        intensity={10}
        position={[2, 5, 3.5]}
        target={lightTargetObj}
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
      />
      <Coffee
        amplify={0.2}
        rotation={[Math.PI / 2, Math.PI, 0]}
        depthColor="#745030"
        surfaceColor="#d47050"
        moveSpeed={0.001}
        position={[2.5, 0.7, 2.5]}
      />
    </>
  );
}
