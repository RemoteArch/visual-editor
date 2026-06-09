export const json_config = {
  type: "ProgressBar",
  label: "Progress Bar",
  category: "Elements",
  description: "Progress bar with customizable value and styling",
  icon: "fa-solid fa-bars-progress",
  acceptsChildren: false,
  props: {
    value: {
      type: "select",
      label: "Progress Value (%)",
      default: "75",
      options: ["0", "10", "25", "50", "75", "90", "100"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "8px",
      options: ["4px", "6px", "8px", "12px", "16px", "20px", "24px"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#e5e7eb"
    },
    fillColor: {
      type: "color",
      label: "Fill Color",
      default: "#4f46e5"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "4px",
      options: ["0", "2px", "4px", "8px", "12px", "50%"]
    },
    showLabel: {
      type: "boolean",
      label: "Show Label",
      default: true
    },
    labelPosition: {
      type: "select",
      label: "Label Position",
      default: "outside",
      options: ["inside", "outside", "none"]
    },
    labelColor: {
      type: "color",
      label: "Label Color",
      default: "#111827"
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    }
  }
};

export default function ProgressBar({ 
  value = "75",
  height = "8px",
  backgroundColor = "#e5e7eb",
  fillColor = "#4f46e5",
  borderRadius = "4px",
  showLabel = true,
  labelPosition = "outside",
  labelColor = "#111827",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const progressValue = Math.min(Math.max(parseInt(value), 0), 100);

  return (
    <div style={{ marginTop, marginBottom }}>
      {showLabel && labelPosition === "outside" && (
        <div style={{
          fontSize: "14px",
          fontWeight: "600",
          color: labelColor,
          marginBottom: "8px"
        }}>
          {progressValue}%
        </div>
      )}
      <div style={{
        width: "100%",
        height,
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        overflow: "hidden"
      }}>
        <div
          style={{
            width: `${progressValue}%`,
            height: "100%",
            backgroundColor: fillColor,
            borderRadius: `${borderRadius}px`,
            transition: "width 0.3s ease"
          }}
        />
      </div>
      {showLabel && labelPosition === "inside" && (
        <div style={{
          position: "relative",
          marginTop: `-${height}`,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "600"
        }}>
          {progressValue}%
        </div>
      )}
    </div>
  );
}
