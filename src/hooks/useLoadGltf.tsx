import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "../models/modelTypes";

let target = "";

export default function useLoadGltf(url: string) {
  const obj = useGLTF(url) as GLTFResult;
  target = url;
  obj.scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      // check if object is a mesh
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = true; // set castShadow property if it exists
    }
  });
  obj.scene.castShadow = true; // set castShadow property of the scene
  return obj;
}

useGLTF.preload(target);
