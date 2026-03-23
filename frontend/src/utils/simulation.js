export function getRoomColor(room) {
  if (room.reserved) return "#3b82f6";
  const ratio = room.capacity === 0 ? 0 : room.occupancy / room.capacity;
  if (ratio < 0.4) return "#22c55e";
  if (ratio <= 0.7) return "#eab308";
  return "#ef4444";
}

export function createStudentDots(room, count = 20) {
  const safeCount = Math.max(4, count);
  const ratio = room.capacity === 0 ? 0 : room.occupancy / room.capacity;
  const active = Math.floor(safeCount * ratio);

  return Array.from({ length: safeCount }, (_, i) => ({
    id: `${room.id}-student-${i}`,
    active: i < active
  }));
}
