export const json_config = {
  type: "Sidebar",
  label: "Sidebar",
  category: "Layout",
  description: "Sidebar layout container",
  icon: "fa-solid fa-table-columns",
  acceptsChildren: true,
  props: {
    position: {
      type: "select",
      label: "Position",
      default: "left",
      options: ["left", "right"]
    },
    width: {
      type: "select",
      label: "Sidebar Width",
      default: "250px",
      options: ["200px", "250px", "300px", "350px", "400px", "25%", "30%", "35%"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px"]
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#e5e7eb"
    },
    borderWidth: {
      type: "select",
      label: "Border Width",
      default: "1px",
      options: ["0", "1px", "2px", "3px"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
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

export default function Sidebar({ 
  position = "left",
  width = "250px",
  backgroundColor = "#ffffff",
  padding = "24px",
  borderColor = "#e5e7eb",
  borderWidth = "1px",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px",
  children
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
      display: "flex",
      gap: "24px",
      marginTop,
      marginBottom
    }}>
      <aside
        style={{
          width,
          backgroundColor,
          padding,
          border: borderWidth !== "0" ? `${borderWidth} solid ${borderColor}` : "none",
          borderRadius: "8px",
          boxShadow: boxShadowMap[boxShadow],
          flexShrink: 0
        }}
      >
        {children}
      </aside>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#9ca3af", fontStyle: "italic" }}>
          Main content area
        </div>
      </div>
    </div>
  );
}
