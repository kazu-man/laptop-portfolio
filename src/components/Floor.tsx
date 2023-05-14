import { RigidBody } from "@react-three/rapier";

export default function Floor() {
  return (
    <RigidBody type="fixed">
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </RigidBody>
  );
}
