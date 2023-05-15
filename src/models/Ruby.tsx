/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult, ModelProps } from "./modelTypes";

export default function Ruby(props: ModelProps) {
  const group = useRef(null);
  const { nodes, materials } = useGLTF("/ruby.gltf") as GLTFResult;
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[0.3, 0.3, 0.3]}
      rotation={[Math.random(), Math.random(), Math.random()]}
      onPointerOver={() => {
        props.cursorIn();
      }}
      onPointerOut={() => {
        props.cursorOut();
      }}
      onClick={(current) => {
        current.stopPropagation();
        props.setSelectedUrlId(props.urls.id);
      }}
    >
      <mesh geometry={nodes.Ruby.geometry} material={materials.Material} />
    </group>
  );
}

useGLTF.preload("/ruby.gltf");