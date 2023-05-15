import { GLTF } from "three-stdlib";

export type ModelProps = {
  urls: {
    id: number;
    title: string;
    url: string;
  };
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
