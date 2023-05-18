import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { SpotLight } from "@react-three/drei";

export default function MovingSpot({ ...props }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const light = useRef<typeof SpotLight | any>(null);
  const viewport = useThree((state) => state.viewport);

  useFrame((state) => {
    if (!light.current) return;
    light.current.target.position.lerp(
      new Vector3(
        (state.mouse.x * viewport.width) / 5,
        -(state.mouse.y * viewport.height) / 5,
        -(state.mouse.y * viewport.height) / 5
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });

  useEffect(() => {
    light.current.shadow.normalBias = 0.02;
  }, []);

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1.5}
      distance={8}
      angle={0.35}
      attenuation={6}
      anglePower={7}
      intensity={3}
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
