<<<<<<< HEAD
# PridRoom
=======
# CampusPulse 3D

3D campus digital twin MVP with live classroom simulation, prediction, and reservation + payment mock.

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000` and broadcasts updates via Socket.io.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API

- `GET /rooms` - current rooms state
- `POST /events/lecture` - trigger lecture event (`{ roomId? }`)
- `POST /pay` - mock payment and reserve room (`{ roomId }`)

## Notes

- Simulation ticks every second.
- Prediction risk is computed from recent trend and highlighted in UI.
- Reserved rooms turn blue, become full, and stop simulation updates.
>>>>>>> 85a6113 (Build CampusPulse 3D MVP with realtime simulation and payment mock)
