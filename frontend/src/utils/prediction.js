export function predictedLabel(room) {
  const predicted = Math.round(room.predicted ?? room.occupancy);
  return `${predicted}/${room.capacity}`;
}
