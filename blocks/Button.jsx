export const json_config = {
  type: "Button",
  label: "Button",
  category: "Basic",
  description: "Call-to-action button",
  icon: "fa-solid fa-hand-pointer",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Button Text",
      default: "Click Me"
    },
    href: {
      type: "string",
      label: "Link (href)",
      default: "#"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#2563eb"
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
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16",
      options: ["14", "16", "18"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12", "9999"]
    }
  }
};

export default function Button({ text = "Click Me", href = "#", backgroundColor = "#2563eb", textColor = "#ffffff", paddingX = "24", paddingY = "12", fontSize = "16", borderRadius = "8" }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        backgroundColor,
        color: textColor,
        padding: `${paddingY}px ${paddingX}px`,
        fontSize: `${fontSize}px`,
        fontWeight: "500",
        borderRadius: `${borderRadius}px`,
        textDecoration: "none",
        transition: "background-color 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = adjustColor(backgroundColor, -20)}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = backgroundColor}
    >
      {text}
    </a>
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
