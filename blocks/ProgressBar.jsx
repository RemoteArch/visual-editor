export const json_config = {
  type: "ProgressBar",
  label: "Progress Bar",
  category: "Advanced",
  description: "Progress bar",
  icon: "fa-solid fa-bars-progress",
  acceptsChildren: false,
  props: {
    value: {
      type: "number",
      label: "Value",
      default: 75
    },
    max: {
      type: "number",
      label: "Maximum",
      default: 100
    },
    showLabel: {
      type: "boolean",
      label: "Show Label",
      default: true
    },
    color: {
      type: "color",
      label: "Bar Color",
      default: "#4f46e5"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#e5e7eb"
    },
    height: {
      type: "select",
      label: "Height (px)",
      default: "16",
      options: ["8", "12", "16", "20", "24"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "9999",
      options: ["0", "4", "8", "9999"]
    }
  }
};

export default function ProgressBar({ value = 75, max = 100, showLabel = true, color = "#4f46e5", backgroundColor = "#e5e7eb", height = "16", borderRadius = "9999" }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      {showLabel && <div style={{ fontSize: "14px", color: "#4b5563", marginBottom: "4px" }}>{percentage}%</div>}
      <div style={{ width: "100%", backgroundColor, height: `${height}px`, borderRadius: `${borderRadius}px` }}>
        <div
          style={{ width: `${percentage}%`, backgroundColor, height: `${height}px`, borderRadius: `${borderRadius}px`, transition: "width 0.5s" }}
        />
      </div>
    </div>
  );
}
