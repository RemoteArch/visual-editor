export const json_config = {
  type: "SubmitButton",
  label: "Submit Button",
  category: "Forms",
  description: "Form submit button",
  icon: "fa-solid fa-paper-plane",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Button Text",
      default: "Submit"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#4f46e5"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#ffffff"
    },
    paddingX: {
      type: "select",
      label: "Padding X",
      default: "24",
      options: ["16", "20", "24", "32"]
    },
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "12",
      options: ["8", "10", "12", "16"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12"]
    }
  }
};

export default function SubmitButton({ text = "Submit", backgroundColor = "#4f46e5", textColor = "#ffffff", paddingX = "24", paddingY = "12", borderRadius = "8" }) {
  return (
    <button 
      type="submit" 
      style={{
        width: "100%",
        backgroundColor,
        color: textColor,
        padding: `${paddingY}px ${paddingX}px`,
        fontWeight: "500",
        borderRadius: `${borderRadius}px`,
        cursor: "pointer",
        border: "none",
        transition: "background-color 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = adjustColor(backgroundColor, -20)}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = backgroundColor}
    >
      {text}
    </button>
  );
}

function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}
