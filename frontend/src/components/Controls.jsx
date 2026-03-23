export default function Controls({ rooms, onLecture, onReserve, busy }) {
  return (
    <aside className="sidebar">
      <h2>CampusPulse Controls</h2>
      <button onClick={() => onLecture()} disabled={busy}>
        {busy ? "Triggering..." : "Start Lecture Event"}
      </button>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-row">
            <div>
              <strong>{room.name}</strong>
              <p>
                {room.occupancy}/{room.capacity}
              </p>
            </div>
            <button onClick={() => onReserve(room.id)} disabled={room.reserved || busy}>
              {room.reserved ? "Reserved" : "Reserve Room"}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
