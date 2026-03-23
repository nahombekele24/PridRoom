import { predictedLabel } from "../utils/prediction";

export default function PredictionOverlay({ room }) {
  if (!room?.risk) return null;
  return (
    <div className="risk-overlay">
      <span>RISK</span>
      <small>Pred: {predictedLabel(room)}</small>
    </div>
  );
}
