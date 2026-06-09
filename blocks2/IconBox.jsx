export const json_config = {
  type: "IconBox",
  label: "Icon Box",
  category: "Elements",
  description: "Icon with background box and customizable styling",
  icon: "fa-solid fa-square",
  acceptsChildren: false,
  props: {
    iconClass: {
      type: "string",
      label: "Icon Class (Font Awesome)",
      default: "fa-solid fa-star"
    },
    title: {
      type: "string",
      label: "Title",
      default: "Icon Box Title"
    },
    description: {
      type: "textarea",
      label: "Description",
      default: "Add a description for this icon box"
    },
    iconSize: {
      type: "select",
      label: "Icon Size",
      default: "48px",
      options: ["24px", "32px", "40px", "48px", "56px", "64px", "2rem", "3rem", "4rem"]
    },
    iconColor: {
      type: "color",
      label: "Icon Color",
      default: "#ffffff"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#4f46e5"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "24px", "32px", "48px", "64px", "1rem", "2rem", "3rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "12px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "md",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "auto",
      options: ["auto", "100%", "50%", "200px", "300px", "400px", "500px"]
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

export default function IconBox({ 
  iconClass = "fa-solid fa-star",
  title = "Icon Box Title",
  description = "Add a description for this icon box",
  iconSize = "48px",
  iconColor = "#ffffff",
  backgroundColor = "#4f46e5",
  padding = "24px",
  borderRadius = "12px",
  boxShadow = "md",
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
    <div style={{
      width,
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      textAlign
    }}>
      <i
        className={iconClass}
        style={{
          fontSize: iconSize,
          color: iconColor,
          display: "block",
          marginBottom: title || description ? "16px" : "0"
        }}
      />
      {title && (
        <h3 style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: description ? "8px" : "0"
        }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: "14px",
          margin: 0
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
