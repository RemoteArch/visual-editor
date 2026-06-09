export const json_config = {
  type: "Container",
  label: "Container",
  category: "Layout",
  description: "Container wrapper with customizable width and spacing",
  icon: "fa-solid fa-box-open",
  acceptsChildren: true,
  props: {
    maxWidth: {
      type: "select",
      label: "Max Width",
      default: "1200px",
      options: ["none", "640px", "768px", "1024px", "1200px", "1400px", "100%", "100vw"]
    },
    paddingX: {
      type: "select",
      label: "Padding X",
      default: "24px",
      options: ["0", "16px", "24px", "32px", "48px", "64px", "10%", "5vw"]
    },
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "0",
      options: ["0", "16px", "24px", "32px", "48px", "64px", "10vh", "5vh"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    margin: {
      type: "select",
      label: "Margin",
      default: "0",
      options: ["0", "16px", "24px", "32px", "48px", "64px", "auto"]
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "left",
      options: ["left", "center", "right"]
    }
  }
};

export default function Container({ children, maxWidth = "1200px", paddingX = "24px", paddingY = "0", backgroundColor = "transparent", borderRadius = "0", boxShadow = "none", margin = "0", textAlign = "left" }) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <div style={{
      maxWidth: maxWidth === "none" ? "none" : maxWidth,
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: paddingY,
      paddingBottom: paddingY,
      backgroundColor,
      borderRadius,
      boxShadow: boxShadowMap[boxShadow],
      margin,
      textAlign,
      width: "100%"
    }}>
      {children}
    </div>
  );
}
