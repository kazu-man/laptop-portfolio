import { Center, Float, SpotLight, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";
import Taxi from "../models/Taxi";
import Ruby from "../models/Ruby";
import Virus from "../models/Virus";
import ReactLogo from "../models/ReactLogo";
import Cactus from "../models/Cactus";

type TitleProps = {
  textPosition: [number, number, number];
  urls: {
    id: number;
    title: string;
    url: string;
    model: string;
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
  const titleY = 10;
  const lightPosition = [textPosition[0], lightY, textPosition[2]];
  const titlePosition = [textPosition[0], titleY, textPosition[2]];

  const light = useRef<typeof SpotLight | any>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(
    null as unknown as THREE.MeshStandardMaterial
  );
  const textRef = useRef<RigidBodyApi>(null);

  const lightTargetObj = new THREE.Object3D();
  lightTargetObj.position.set(...(textPosition as [number, number, number]));

  const titleRef = useRef<THREE.Group>(null!);

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

      titleRef.current.position.x = x;
      titleRef.current.position.y = y + 1;
      titleRef.current.position.z = z;
    }

    materialRef.current.emissive = textColor.current;
    materialRef.current.needsUpdate = true;
  });

  const modelValues = {
    cursorIn,
    cursorOut,
    setSelectedUrlId,
    urls,
  };

  const getModel = (modelName: string) => {
    switch (modelName) {
      case "taxi":
        return <Taxi {...modelValues} />;
      case "virus":
        return <Virus {...modelValues} />;
      case "reactLogo":
        return <ReactLogo {...modelValues} />;
      case "cactus":
        return <Cactus {...modelValues} />;
      case "ruby":
        return <Ruby {...modelValues} />;
    }
  };

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
      <Center
        ref={titleRef}
        position={
          lightPosition
            ? new THREE.Vector3(...titlePosition)
            : new THREE.Vector3()
        }
      >
        <Float>
          <Text3D
            castShadow={false}
            curveSegments={5}
            // bevelEnabled
            // bevelSize={0.01}
            // bevelThickness={0.01}
            height={0.005}
            lineHeight={0.05}
            letterSpacing={0.01}
            size={0.1}
            font="/Inter_Bold.json"
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
            {urls.title}
            <meshStandardMaterial
              ref={materialRef}
              color="#f09030"
              emissiveIntensity={2}
            />
          </Text3D>
        </Float>
      </Center>
      <RigidBody
        colliders="cuboid"
        ref={textRef}
        position={
          textPosition
            ? new THREE.Vector3(...textPosition)
            : new THREE.Vector3()
        }
        rotation={[Math.random(), Math.random(), Math.random()]}
      >
        {getModel(urls.model)}
      </RigidBody>
    </>
  );
}
