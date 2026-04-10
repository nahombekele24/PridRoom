import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import Room3D from "./Room3D";

export default function Campus3D({ rooms }) {
  const cols = 4;
 
  return (
    <div className="canvas-wrap">
      <Canvas camera={{ position: [0, 7, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[8, 12, 6]} intensity={1.2} />
        <Environment preset="sunset" />
        <Grid args={[24, 24]} cellSize={1} cellThickness={0.6} sectionSize={4} fadeDistance={28} />

        {rooms.map((room, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const x = (col - 1.5) * 3;
          const z = (row - 1) * 3;
          return <Room3D key={room.id} room={room} position={[x, 0, z]} />;
        })}

        <OrbitControls enablePan enableRotate enableZoom maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
