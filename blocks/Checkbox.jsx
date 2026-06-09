export const json_config = {
  type: "Checkbox",
  label: "Checkbox",
  category: "Forms",
  description: "Checkbox input",
  icon: "fa-solid fa-square-check",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Accept terms and conditions"
    },
    checked: {
      type: "boolean",
      label: "Checked",
      default: false
    },
    required: {
      type: "boolean",
      label: "Required",
      default: false
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

export default function Checkbox({ label = "Accept terms and conditions", checked = false, required = false, fontSize = "14", color = "#374151" }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input type="checkbox" defaultChecked={checked} required={required} style={{ width: "16px", height: "16px" }} />
      <span style={{ fontSize: `${fontSize}px`, color }}>{label}</span>
    </label>
  );
}
