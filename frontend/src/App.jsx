import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import Campus3D from "./components/Campus3D";
import Controls from "./components/Controls";
import PredictionOverlay from "./components/PredictionOverlay";

const API_BASE = "http://localhost:4000";

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("Live simulation connected.");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const socket = io(API_BASE);
    socket.on("rooms:update", (payload) => {
      setRooms(payload.rooms || []);
    });

    socket.on("connect_error", () => {
      setMessage("Backend connection failed.");
    });

    return () => socket.disconnect();
  }, []);

  const selectedRisk = useMemo(() => rooms.find((room) => room.risk), [rooms]);

  async function handleLecture(roomId) {
    try {
      setBusy(true);
      const response = await fetch(`${API_BASE}/events/lecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId })
      });
      const data = await response.json();
      setMessage(data.message || "Lecture event triggered.");
    } catch (error) {
      setMessage("Could not trigger lecture event.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReserve(roomId) {
    try {
      setBusy(true);
      const response = await fetch(`${API_BASE}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId })
      });
      const data = await response.json();
      setMessage(data.message || "Reservation updated.");
    } catch (error) {
      setMessage("Payment flow failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="layout">
      <section className="scene-panel">
        <h1>CampusPulse 3D Digital Twin</h1>
        <p>{message}</p>
        <Campus3D rooms={rooms} />
      </section>
      <Controls rooms={rooms} onLecture={handleLecture} onReserve={handleReserve} busy={busy} />
      <PredictionOverlay room={selectedRisk} />
    </main>
  );
}
