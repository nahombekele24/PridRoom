const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const paymentRouter = require("./routes/payment");
const { createRooms } = require("./models/room");
const { tickSimulation, triggerLectureEvent } = require("./services/simulation");

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

const rooms = createRooms();
app.locals.rooms = rooms;

app.locals.broadcastState = () => {
  io.emit("rooms:update", { rooms });
};

app.get("/rooms", (req, res) => {
  res.json({ rooms });
});

app.post("/events/lecture", (req, res) => {
  const selected = triggerLectureEvent(rooms, req.body?.roomId);
  if (!selected) {
    return res.status(409).json({ success: false, message: "All rooms are reserved" });
  }

  app.locals.broadcastState();
  return res.json({
    success: true,
    roomId: selected.id,
    message: `Lecture event triggered in ${selected.name}`
  });
});

app.use("/pay", paymentRouter);

io.on("connection", (socket) => {
  socket.emit("rooms:update", { rooms });
});

setInterval(() => {
  tickSimulation(rooms);
  app.locals.broadcastState();
}, 1000);

server.listen(PORT, () => {
  console.log(`CampusPulse backend running on http://localhost:${PORT}`);
});
