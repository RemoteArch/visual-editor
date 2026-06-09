import React from "react";

export const json_config = {
  type: "Accordion",
  label: "Accordion",
  category: "Elements",
  description: "Collapsible content sections with customizable styling",
  icon: "fa-solid fa-layer-group",
  acceptsChildren: true,
  props: {
    titles: {
      type: "textarea",
      label: "Section Titles (one per line)",
      default: "Section 1\nSection 2\nSection 3"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    headerBackgroundColor: {
      type: "color",
      label: "Header Background Color",
      default: "#f9fafb"
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#e5e7eb"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    headerTextColor: {
      type: "color",
      label: "Header Text Color",
      default: "#111827"
    },
    padding: {
      type: "select",
      label: "Content Padding",
      default: "16px",
      options: ["12px", "16px", "20px", "24px", "32px"]
    },
    headerPadding: {
      type: "select",
      label: "Header Padding",
      default: "16px",
      options: ["12px", "16px", "20px", "24px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    headerFontSize: {
      type: "select",
      label: "Header Font Size",
      default: "16px",
      options: ["14px", "16px", "18px", "20px", "1rem", "1.25rem"]
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

export default function Accordion({ 
  children, 
  titles = "Section 1\nSection 2\nSection 3",
  backgroundColor = "#ffffff",
  headerBackgroundColor = "#f9fafb",
  borderColor = "#e5e7eb",
  textColor = "#111827",
  headerTextColor = "#111827",
  padding = "16px",
  headerPadding = "16px",
  borderRadius = "8px",
  boxShadow = "none",
  headerFontSize = "16px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [openItems, setOpenItems] = React.useState([0]);
  const titleList = typeof titles === "string" ? titles.split("\n").filter(t => t.trim()) : titles;
  const childrenArray = React.Children.toArray(children);

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div style={{
      backgroundColor,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      border: `1px solid ${borderColor}`,
      marginTop,
      marginBottom
    }}>
      {titleList.map((title, index) => (
        <div key={index} style={{
          borderBottom: index < titleList.length - 1 ? `1px solid ${borderColor}` : "none"
        }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: "100%",
              padding: headerPadding,
              fontSize: headerFontSize,
              fontWeight: "600",
              color: headerTextColor,
              backgroundColor: headerBackgroundColor,
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left"
            }}
          >
            {title}
            <span style={{ fontSize: "12px" }}>
              {openItems.includes(index) ? "−" : "+"}
            </span>
          </button>
          {openItems.includes(index) && (
            <div style={{
              padding,
              color: textColor
            }}>
              {childrenArray[index] || <div style={{ color: "#6b7280" }}>No content for this section</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
