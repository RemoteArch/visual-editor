import React from "react";

export const json_config = {
  type: "OffCanvas",
  label: "Off-Canvas",
  category: "Layout",
  description: "Slide-in panel for additional content",
  icon: "fa-solid fa-bars",
  acceptsChildren: true,
  props: {
    triggerText: {
      type: "string",
      label: "Trigger Button Text",
      default: "Open Menu"
    },
    position: {
      type: "select",
      label: "Position",
      default: "right",
      options: ["left", "right", "top", "bottom"]
    },
    width: {
      type: "select",
      label: "Width (for left/right)",
      default: "300px",
      options: ["250px", "300px", "350px", "400px", "500px"]
    },
    height: {
      type: "select",
      label: "Height (for top/bottom)",
      default: "300px",
      options: ["200px", "300px", "400px", "500px", "auto"]
    },
    overlayColor: {
      type: "color",
      label: "Overlay Color",
      default: "rgba(0, 0, 0, 0.5)"
    },
    backgroundColor: {
      type: "color",
      label: "Panel Background Color",
      default: "#ffffff"
    },
    padding: {
      type: "select",
      label: "Panel Padding",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px"]
    },
    triggerColor: {
      type: "color",
      label: "Trigger Button Color",
      default: "#4f46e5"
    },
    triggerTextColor: {
      type: "color",
      label: "Trigger Button Text Color",
      default: "#ffffff"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px"]
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

export default function OffCanvas({ 
  triggerText = "Open Menu",
  position = "right",
  width = "300px",
  height = "300px",
  overlayColor = "rgba(0, 0, 0, 0.5)",
  backgroundColor = "#ffffff",
  padding = "24px",
  triggerColor = "#4f46e5",
  triggerTextColor = "#ffffff",
  borderRadius = "8px",
  marginTop = "0", 
  marginBottom = "16px",
  children
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getPositionStyles = () => {
    switch (position) {
      case "left":
        return {
          panel: { left: 0, top: 0, bottom: 0, width },
          transform: isOpen ? "translateX(0)" : "translateX(-100%)"
        };
      case "right":
        return {
          panel: { right: 0, top: 0, bottom: 0, width },
          transform: isOpen ? "translateX(0)" : "translateX(100%)"
        };
      case "top":
        return {
          panel: { left: 0, right: 0, top: 0, height },
          transform: isOpen ? "translateY(0)" : "translateY(-100%)"
        };
      case "bottom":
        return {
          panel: { left: 0, right: 0, bottom: 0, height },
          transform: isOpen ? "translateY(0)" : "translateY(100%)"
        };
      default:
        return {
          panel: { right: 0, top: 0, bottom: 0, width },
          transform: isOpen ? "translateX(0)" : "translateX(100%)"
        };
    }
  };

  const positionStyles = getPositionStyles();

  return (
    <div style={{ marginTop, marginBottom }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: triggerColor,
          color: triggerTextColor,
          border: "none",
          borderRadius: `${borderRadius}px`,
          padding: "12px 24px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          transition: "transform 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      >
        {triggerText}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: overlayColor,
              zIndex: 999
            }}
          />
          <div
            style={{
              position: "fixed",
              ...positionStyles.panel,
              backgroundColor,
              padding,
              zIndex: 1000,
              transform: positionStyles.transform,
              transition: "transform 0.3s ease",
              overflowY: "auto",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6b7280",
                padding: "4px",
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.target.style.color = "#111827"}
              onMouseLeave={(e) => e.target.style.color = "#6b7280"}
            >
              ×
            </button>
            {children || (
              <div style={{ color: "#9ca3af", fontStyle: "italic" }}>
                Panel content goes here
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
