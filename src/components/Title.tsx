import { SpotLight, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";

type TitleProps = {
  textPosition: [number, number, number];
  urls: {
    id: number;
    title: string;
    url: string;
  };
  cursorIn: () => void;
  cursorOut: () => void;
  selectedUrlId: MutableRefObject<number>;
  setSelectedUrlId: (id: number) => void;
};

export default function Title({
  textPosition,
  urls,
  cursorIn,
  cursorOut,
  selectedUrlId,
  setSelectedUrlId,
}: TitleProps) {
  const lightY = 5;
  const lightPosition = [textPosition[0], lightY, textPosition[2]];

  const light = useRef<typeof SpotLight | any>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const textRef = useRef<RigidBodyApi>(null);

  const lightTargetObj = new THREE.Object3D();
  lightTargetObj.position.set(...(textPosition as [number, number, number]));

  const getEmissiveColor = () => {
    return selectedUrlId.current === urls.id
      ? new THREE.Color("#ff0000")
      : new THREE.Color("#000000");
  };

  const textColor = useRef(getEmissiveColor());

  useFrame(() => {
    textColor.current = getEmissiveColor();

    const position = textRef.current?.translation();
    if (position) {
      const { x, y, z } = position;

      lightTargetObj.position.x = x;
      lightTargetObj.position.y = y;
      lightTargetObj.position.z = z;
      light.current.target.updateMatrixWorld();
    }

    materialRef.current.emissive = textColor.current;
    materialRef.current.needsUpdate = true;
  });

  return (
    <>
      <SpotLight
        ref={light}
        castShadow
        penumbra={1.5}
        distance={10}
        angle={0.12}
        attenuation={0.3}
        anglePower={10}
        intensity={2.5}
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
          lightPosition
            ? new THREE.Vector3(...lightPosition)
            : new THREE.Vector3()
        }
        target={lightTargetObj}
      />
      <RigidBody
        colliders="hull"
        ref={textRef}
        position={
          textPosition
            ? new THREE.Vector3(...textPosition)
            : new THREE.Vector3()
        }
      >
        <Text3D
          castShadow={true}
          curveSegments={5}
          bevelEnabled
          bevelSize={0.01}
          bevelThickness={0.01}
          height={0.1}
          lineHeight={0.1}
          letterSpacing={-0.06}
          size={0.3}
          font="/Inter_Bold.json"
          rotation={[Math.random(), Math.random(), Math.random()]}
          onPointerOver={() => {
            cursorIn();
          }}
          onPointerOut={() => {
            cursorOut();
          }}
          onClick={(current) => {
            current.stopPropagation();
            setSelectedUrlId(urls.id);
          }}
        >
          My
          <meshStandardMaterial ref={materialRef} color="#f09030" />
        </Text3D>
      </RigidBody>
    </>
  );
}
