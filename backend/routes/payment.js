const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { roomId } = req.body;
  if (!roomId) return res.status(400).json({ success: false, message: "roomId is required" });

  const rooms = req.app.locals.rooms;
  const room = rooms.find((item) => item.id === roomId);
  if (!room) return res.status(404).json({ success: false, message: "Room not found" });
  if (room.reserved) return res.status(409).json({ success: false, message: "Room already reserved" });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  room.reserved = true;
  room.occupancy = room.capacity;
  room.history.push(room.occupancy);
  if (room.history.length > 5) room.history = room.history.slice(-5);

  req.app.locals.broadcastState();

  return res.json({
    success: true,
    message: `${room.name} reserved. Payment successful.`,
    transactionId: `MPESA-${Date.now()}`
  });
});

module.exports = router;
