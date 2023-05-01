import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { SpotLight } from "@react-three/drei";

export default function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef<typeof SpotLight | any>(null!);
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    if (!light.current) return;

    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1.5}
      distance={8}
      angle={0.35}
      attenuation={3}
      anglePower={7}
      intensity={10}
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
      {...props}
    />
  );
}
