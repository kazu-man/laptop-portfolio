import "./App.css";
import { Canvas } from "@react-three/fiber";
import LapTop from "./components/Laptop";
import MovingSpot from "./components/MovingSpot";
function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
    >
      <color attach="background" args={["#202020"]} />
      <fog attach="fog" args={["#202020", 5, 20]} />
      <ambientLight intensity={0.06} />
      <LapTop />

      <MovingSpot position={[3, 3, 0]} color="#ffff00" />
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </Canvas>
  );
}

export default App;
