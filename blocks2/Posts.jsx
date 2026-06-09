export const json_config = {
  type: "Posts",
  label: "Posts",
  category: "Loop",
  description: "Display posts in a grid layout",
  icon: "fa-solid fa-newspaper",
  acceptsChildren: true,
  props: {
    columns: {
      type: "select",
      label: "Columns",
      default: "3",
      options: ["1", "2", "3", "4"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "24px",
      options: ["16px", "24px", "32px", "40px"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
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

export default function Posts({ 
  columns = "3",
  gap = "24px",
  backgroundColor = "transparent",
  padding = "24px",
  borderRadius = "8px",
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
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap
      }}>
        {children || (
          <div style={{ 
            gridColumn: `1 / -1`,
            color: "#9ca3af", 
            fontStyle: "italic",
            textAlign: "center",
            padding: "48px"
          }}>
            Posts will be displayed here
          </div>
        )}
      </div>
    </div>
  );
}
