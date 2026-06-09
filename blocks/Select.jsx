export const json_config = {
  type: "Select",
  label: "Select",
  category: "Forms",
  description: "Select dropdown",
  icon: "fa-solid fa-caret-down",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Label"
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
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#d1d5db"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12"]
    }
  }
};

export default function Select({ label = "Label", options = "Option 1\nOption 2\nOption 3", required = false, borderColor = "#d1d5db", borderRadius = "8" }) {
  const optionList = typeof options === "string" ? options.split("\n").filter(o => o.trim()) : options;
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>{label}</label>}
      <select required={required} style={{ width: "100%", padding: "8px 16px", border: `1px solid ${borderColor}`, borderRadius: `${borderRadius}px`, outline: "none" }}>
        {optionList.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
