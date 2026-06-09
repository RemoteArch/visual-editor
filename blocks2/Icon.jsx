export const json_config = {
  type: "Icon",
  label: "Icon",
  category: "Elements",
  description: "Font Awesome icon with customizable size and color",
  icon: "fa-solid fa-icons",
  acceptsChildren: false,
  props: {
    iconClass: {
      type: "string",
      label: "Icon Class (Font Awesome)",
      default: "fa-solid fa-star"
    },
    size: {
      type: "select",
      label: "Size",
      default: "24px",
      options: ["12px", "16px", "20px", "24px", "32px", "40px", "48px", "64px", "1rem", "1.5rem", "2rem", "3rem", "4rem"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#111827"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    rotate: {
      type: "select",
      label: "Rotation",
      default: "0deg",
      options: ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg", "315deg"]
    },
    align: {
      type: "select",
      label: "Alignment",
      default: "left",
      options: ["left", "center", "right"]
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

export default function Icon({ 
  iconClass = "fa-solid fa-star", 
  size = "24px", 
  color = "#111827",
  backgroundColor = "transparent",
  padding = "0",
  borderRadius = "0",
  rotate = "0deg",
  align = "left",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  return (
    <div style={{
      display: "flex",
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      marginTop,
      marginBottom
    }}>
      <i
        className={iconClass}
        style={{
          fontSize: size,
          color,
          backgroundColor,
          padding,
          borderRadius: `${borderRadius}px`,
          transform: `rotate(${rotate})`,
          display: "inline-block"
        }}
      />
    </div>
  );
}
