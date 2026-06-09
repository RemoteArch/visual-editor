export const json_config = {
  type: "Radio",
  label: "Radio",
  category: "Forms",
  description: "Radio button group",
  icon: "fa-solid fa-circle-dot",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Choose an option"
    },
    name: {
      type: "string",
      label: "Group Name",
      default: "radio-group"
    },
    options: {
      type: "textarea",
      label: "Options (one per line)",
      default: "Option 1\nOption 2\nOption 3"
    },
    required: {
      type: "boolean",
      label: "Required",
      default: false
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "14",
      options: ["12", "14", "16"]
    },
    color: {
      type: "color",
      label: "Text Color",
      default: "#374151"
    }
  }
};

export default function Radio({ label = "Choose an option", name = "radio-group", options = "Option 1\nOption 2\nOption 3", required = false, gap = "8", fontSize = "14", color = "#374151" }) {
  const optionList = typeof options === "string" ? options.split("\n").filter(o => o.trim()) : options;
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>{label}</label>}
      <div style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
        {optionList.map((opt, index) => (
          <label key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="radio"
              name={name}
              value={opt}
              required={required}
              style={{ width: "16px", height: "16px" }}
            />
            <span style={{ fontSize: `${fontSize}px`, color }}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
