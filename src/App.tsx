import "./App.css";
import { Canvas } from "@react-three/fiber";
import LapTop from "./components/Laptop";
import MovingSpot from "./components/MovingSpot";
import { Loader } from "@react-three/drei";
import Title from "./components/Title";
function App() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [-2, 3, 6],
          fov: 50,
          near: 1,
          far: 20,
          rotation: [-Math.PI / 10, -Math.PI / 8, 0],
        }}
      >
        <color attach="background" args={["#202020"]} />
        <fog attach="fog" args={["#202020", 6, 8.5]} />
        <ambientLight intensity={0.06} />
        <Title />
        <LapTop />
        <MovingSpot position={[4, 5, 0]} color="#ffff00" />
        <MovingSpot position={[-4, 5, 0]} color="#ff00ff" />
        <MovingSpot position={[0, 5, 2]} color="#00f0f0" />
        <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[50, 50]} />
          <meshPhongMaterial />
        </mesh>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
