function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateRisk(room) {
  const history = room.history;
  const current = room.occupancy;
  const previous = history.length >= 2 ? history[history.length - 2] : current;
  const trend = current - previous;

  // Approximate 10-30 min horizon by extrapolating 15 ticks for demo.
  const predicted = current + trend * 15;
  room.risk = predicted > room.capacity;
  room.predicted = predicted;
}

function pushHistory(room) {
  room.history.push(room.occupancy);
  if (room.history.length > 5) {
    room.history = room.history.slice(-5);
  }
}

function tickSimulation(rooms) {
  for (const room of rooms) {
    if (room.reserved) continue;
    const change = Math.floor(Math.random() * 9) - 4;
    room.occupancy = clamp(room.occupancy + change, 0, room.capacity);
  }

  const candidates = rooms.filter((room) => !room.reserved);
  if (candidates.length >= 2) {
    const from = candidates[Math.floor(Math.random() * candidates.length)];
    let to = candidates[Math.floor(Math.random() * candidates.length)];
    while (to.id === from.id) {
      to = candidates[Math.floor(Math.random() * candidates.length)];
    }

    const flow = Math.floor(Math.random() * 4);
    const actual = Math.min(flow, from.occupancy, to.capacity - to.occupancy);
    from.occupancy -= actual;
    to.occupancy += actual;
  }

  for (const room of rooms) {
    pushHistory(room);
    updateRisk(room);
  }
}

function triggerLectureEvent(rooms, roomId) {
  const eligible = rooms.filter((room) => !room.reserved);
  if (!eligible.length) return null;

  const selected =
    eligible.find((room) => room.id === roomId) || eligible[Math.floor(Math.random() * eligible.length)];
  const selectedIndex = rooms.findIndex((room) => room.id === selected.id);

  selected.occupancy = clamp(selected.occupancy + Math.floor(selected.capacity * 0.4), 0, selected.capacity);

  const neighbors = [selectedIndex - 1, selectedIndex + 1].filter((idx) => idx >= 0 && idx < rooms.length);
  for (const idx of neighbors) {
    const neighbor = rooms[idx];
    if (neighbor.reserved) continue;
    neighbor.occupancy = clamp(neighbor.occupancy + Math.floor(neighbor.capacity * 0.12), 0, neighbor.capacity);
  }

  for (const room of rooms) {
    pushHistory(room);
    updateRisk(room);
  }
  return selected;
}

module.exports = { tickSimulation, triggerLectureEvent };
