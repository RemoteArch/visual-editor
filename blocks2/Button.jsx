export const json_config = {
  type: "Button",
  label: "Button",
  category: "Basic",
  description: "Clickable button with customizable styling",
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
      label: "Link URL",
      default: "#"
    },
    target: {
      type: "select",
      label: "Target",
      default: "_self",
      options: ["_self", "_blank", "_parent", "_top"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#4f46e5"
    },
    hoverBackgroundColor: {
      type: "color",
      label: "Hover Background Color",
      default: "#4338ca"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#ffffff"
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "24px", "1rem", "1.25rem", "1.5rem"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "600",
      options: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold"]
    },
    paddingX: {
      type: "select",
      label: "Padding X",
      default: "24px",
      options: ["8px", "12px", "16px", "20px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "12px",
      options: ["4px", "8px", "12px", "16px", "20px", "24px", "0.5rem", "1rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    border: {
      type: "select",
      label: "Border",
      default: "none",
      options: ["none", "1px solid #000", "2px solid #000", "1px solid #4f46e5", "2px solid #4f46e5"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "auto",
      options: ["auto", "100%", "50%", "fit-content"]
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "center",
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

export default function Button({ 
  text = "Click Me", 
  href = "#", 
  target = "_self",
  backgroundColor = "#4f46e5", 
  hoverBackgroundColor = "#4338ca",
  textColor = "#ffffff", 
  fontSize = "16px", 
  fontWeight = "600", 
  paddingX = "24px", 
  paddingY = "12px", 
  borderRadius = "8px", 
  border = "none",
  boxShadow = "none",
  width = "auto",
  textAlign = "center",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <a
      href={href}
      target={target}
      style={{
        display: "inline-block",
        width,
        backgroundColor,
        color: textColor,
        fontSize,
        fontWeight,
        padding: `${paddingY} ${paddingX}`,
        borderRadius: `${borderRadius}px`,
        border,
        boxShadow: boxShadowMap[boxShadow],
        textAlign,
        marginTop,
        marginBottom,
        textDecoration: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease"
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = hoverBackgroundColor}
      onMouseLeave={(e) => e.target.style.backgroundColor = backgroundColor}
    >
      {text}
    </a>
  );
}
