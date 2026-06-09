export const json_config = {
  type: "Input",
  label: "Input",
  category: "Forms",
  description: "Text input field",
  icon: "fa-solid fa-keyboard",
  acceptsChildren: false,
  props: {
    type: {
      type: "select",
      label: "Type",
      default: "text",
      options: ["text", "email", "password", "tel", "url", "number", "date", "time", "datetime-local"]
    },
    label: {
      type: "string",
      label: "Label",
      default: "Label"
    },
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Enter text..."
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

export default function Input({ type = "text", label = "Label", placeholder = "Enter text...", required = false, borderColor = "#d1d5db", borderRadius = "8" }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "4px" }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
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
