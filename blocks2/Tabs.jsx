import React from "react";

export const json_config = {
  type: "Tabs",
  label: "Tabs",
  category: "Elements",
  description: "Tabbed content with customizable styling",
  icon: "fa-solid fa-folder",
  acceptsChildren: true,
  props: {
    titles: {
      type: "textarea",
      label: "Tab Titles (one per line)",
      default: "Tab 1\nTab 2\nTab 3"
    },
    activeTabColor: {
      type: "color",
      label: "Active Tab Color",
      default: "#4f46e5"
    },
    inactiveTabColor: {
      type: "color",
      label: "Inactive Tab Color",
      default: "#6b7280"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#e5e7eb"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    tabFontSize: {
      type: "select",
      label: "Tab Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem", "1.25rem"]
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

export default function Tabs({ 
  children, 
  titles = "Tab 1\nTab 2\nTab 3",
  activeTabColor = "#4f46e5",
  inactiveTabColor = "#6b7280",
  backgroundColor = "#ffffff",
  borderColor = "#e5e7eb",
  padding = "24px",
  borderRadius = "8px",
  boxShadow = "none",
  tabFontSize = "16px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [activeTab, setActiveTab] = React.useState(0);
  const titleList = typeof titles === "string" ? titles.split("\n").filter(t => t.trim()) : titles;
  const childrenArray = React.Children.toArray(children);

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
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      border: `1px solid ${borderColor}`,
      marginTop,
      marginBottom
    }}>
      <div style={{
        display: "flex",
        borderBottom: `1px solid ${borderColor}`
      }}>
        {titleList.map((title, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: "16px",
              fontSize: tabFontSize,
              fontWeight: "600",
              color: activeTab === index ? activeTabColor : inactiveTabColor,
              backgroundColor: "transparent",
              border: "none",
              borderBottom: activeTab === index ? `2px solid ${activeTabColor}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {title}
          </button>
        ))}
      </div>
      <div style={{ padding }}>
        {childrenArray[activeTab] || <div style={{ color: "#6b7280" }}>No content for this tab</div>}
      </div>
    </div>
  );
}
