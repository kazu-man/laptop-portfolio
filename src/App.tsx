import "./App.css";
import { Canvas } from "@react-three/fiber";
import LapTop from "./components/Laptop";
import MovingSpot from "./components/MovingSpot";
import { Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Floor from "./components/Floor";
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
        <fog attach="fog" args={["#202020", 6, 20]} />
        <ambientLight intensity={0.06} />
        <MovingSpot position={[4, 5, 0]} color="#ffff00" />
        <MovingSpot position={[-4, 5, 0]} color="#ff00ff" />
        <MovingSpot position={[0, 5, 2]} color="#00f0f0" />
        <Physics>
          {/* <Debug /> */}
          <LapTop />
          <Floor />
        </Physics>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
