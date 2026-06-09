export const json_config = {
  type: "SearchBar",
  label: "Search Bar",
  category: "Widgets",
  description: "Search input",
  icon: "fa-solid fa-magnifying-glass",
  acceptsChildren: false,
  props: {
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Search..."
    },
    button: {
      type: "boolean",
      label: "Show Button",
      default: true
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
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
    },
    buttonColor: {
      type: "color",
      label: "Button Color",
      default: "#4f46e5"
    }
  }
};

export default function SearchBar({ placeholder = "Search...", button = true, gap = "8", borderColor = "#d1d5db", borderRadius = "8", buttonColor = "#4f46e5" }) {
  return (
    <div style={{ display: "flex", gap: `${gap}px` }}>
      <input
        type="text"
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "8px 16px",
          border: `1px solid ${borderColor}`,
          borderRadius: `${borderRadius}px`,
          outline: "none"
        }}
      />
      {button && (
        <button 
          style={{
            padding: "8px 16px",
            backgroundColor: buttonColor,
            color: "#ffffff",
            borderRadius: `${borderRadius}px`,
            cursor: "pointer",
            border: "none"
          }}
        >
          Search
        </button>
      )}
    </div>
  );
}
