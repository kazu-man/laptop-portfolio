import { GLTF } from "three-stdlib";
import { urlsType } from "../components/Laptop";

export type ModelProps = {
  urls: urlsType;
  cursorIn: () => void;
  cursorOut: () => void;
  setSelectedUrlId: (id: number) => void;
};

export type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
};
