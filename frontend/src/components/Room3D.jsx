import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createStudentDots, getRoomColor } from "../utils/simulation";

function StudentDots({ room }) {
  const dots = useMemo(() => createStudentDots(room, 24), [room]);
  const seed = Number(room.id.replace("room-", ""));

  return dots.map((dot, index) => {
    const x = ((index % 6) - 2.5) * 0.28;
    const z = (Math.floor(index / 6) - 1.5) * 0.28;
    const jitterX = Math.sin((index + seed) * 1.7) * 0.05;
    const jitterZ = Math.cos((index + seed) * 1.3) * 0.05;
    return (
      <mesh key={dot.id} position={[x + jitterX, 0.18, z + jitterZ]} visible={dot.active}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    );
  }); 
}

export default function Room3D({ room, position }) {
  const baseRef = useRef(null);

  useFrame(({ clock }) => {
    if (!baseRef.current) return;
    const pulse = room.risk ? 1 + Math.sin(clock.getElapsedTime() * 6) * 0.08 : 1;
    baseRef.current.scale.set(pulse, 1, pulse);
  });

  return (
    <group position={position}>
      <mesh ref={baseRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[1.8, 0.2, 1.8]} />
        <meshStandardMaterial color={getRoomColor(room)} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.7, 0.7, 1.7]} />
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.75} />
      </mesh>
      <StudentDots room={room} />
      <Html position={[0, 1.15, 0]} center>
        <div className={`room-label ${room.risk ? "room-label-risk" : ""}`}>
          <strong>{room.name}</strong>
          <span>
            {room.occupancy}/{room.capacity}
          </span>
          {room.reserved ? <small>Reserved</small> : null}
        </div>
      </Html>
    </group>
  );
}
