import { useFrame } from "@react-three/fiber";
import useLoadGltf from "../hooks/useLoadGltf";
import * as THREE from "three";
export default function Cup() {
  const obj = useLoadGltf("/Cup.glb");
  const textMesh = obj.scene.children.find(
    (mesh) => mesh.name === "Text001"
  ) as THREE.Mesh;
  const cupMesh = obj.scene.children.find(
    (mesh) => mesh.name === "Cylinder"
  ) as THREE.Mesh;

  //テキストを発酵させる
  if (textMesh) {
    const material = textMesh.material as THREE.MeshStandardMaterial;
    material.emissive = new THREE.Color("#fff000");
  }
  if (cupMesh) {
    const material = cupMesh.material as THREE.MeshStandardMaterial;
    material.color = new THREE.Color("gray");
  }

  useFrame((_state) => {
    if (textMesh) {
      const material = textMesh.material as THREE.MeshStandardMaterial;
      material.emissive = new THREE.Color("#fff000");
      material.emissiveIntensity = Math.sin(_state.clock.elapsedTime / 2) + 0.2;
    }
  });
  return (
    <>
      <mesh
        position={[2.5, 0, 2.5]}
        scale={0.8}
        rotation={[0, -Math.PI / 4, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={obj.scene} scale={[0.5, 0.5, 0.5]} castShadow />
      </mesh>
      <pointLight
        position={[3.5, 0.1, 5]}
        color="white"
        intensity={0.05}
        castShadow
      />
    </>
  );
}