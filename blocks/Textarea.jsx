export const json_config = {
  type: "Textarea",
  label: "Textarea",
  category: "Forms",
  description: "Textarea field",
  icon: "fa-solid fa-font",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Label"
    },
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Enter your message..."
    },
    rows: {
      type: "select",
      label: "Rows",
      default: "4",
      options: ["2", "3", "4", "6", "8"]
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

export default function Textarea({ label = "Label", placeholder = "Enter your message...", rows = 4, required = false, borderColor = "#d1d5db", borderRadius = "8" }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        required={required}
        style={{
          width: "100%",
          padding: "8px 16px",
          border: `1px solid ${borderColor}`,
          borderRadius: `${borderRadius}px`,
          outline: "none"
        }}
      />
    </div>
  );
}
