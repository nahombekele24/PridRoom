function createRooms() {
  return Array.from({ length: 12 }, (_, index) => {
    const id = `room-${index + 1}`;
    const capacity = 50 + (index % 3) * 10;
    const occupancy = Math.floor(capacity * (0.2 + Math.random() * 0.35));

    return {
      id,
      name: `Room ${index + 1}`,
      capacity,
      occupancy,
      reserved: false,
      history: [occupancy],
      risk: false
    };
  });
}

module.exports = { createRooms };
