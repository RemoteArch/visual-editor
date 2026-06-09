export const json_config = {
  type: "Alert",
  label: "Alert",
  category: "Elements",
  description: "Alert message with type-based styling",
  icon: "fa-solid fa-triangle-exclamation",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "This is an alert message"
    },
    type: {
      type: "select",
      label: "Type",
      default: "info",
      options: ["info", "success", "warning", "error"]
    },
    showIcon: {
      type: "boolean",
      label: "Show Icon",
      default: true
    },
    dismissible: {
      type: "boolean",
      label: "Dismissible",
      default: false
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#eff6ff"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#1e40af"
    },
    iconColor: {
      type: "color",
      label: "Icon Color",
      default: "#3b82f6"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px", "32px"]
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
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem"]
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

export default function Alert({ 
  content = "This is an alert message",
  type = "info",
  showIcon = true,
  dismissible = false,
  backgroundColor = "#eff6ff",
  textColor = "#1e40af",
  iconColor = "#3b82f6",
  padding = "16px",
  borderRadius = "8px",
  boxShadow = "none",
  fontSize = "16px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [visible, setVisible] = React.useState(true);

  const typeIcons = {
    info: "fa-solid fa-circle-info",
    success: "fa-solid fa-circle-check",
    warning: "fa-solid fa-triangle-exclamation",
    error: "fa-solid fa-circle-xmark"
  };

  const typeColors = {
    info: { bg: "#eff6ff", text: "#1e40af", icon: "#3b82f6" },
    success: { bg: "#f0fdf4", text: "#166534", icon: "#22c55e" },
    warning: { bg: "#fffbeb", text: "#92400e", icon: "#f59e0b" },
    error: { bg: "#fef2f2", text: "#991b1b", icon: "#ef4444" }
  };

  const colors = typeColors[type] || typeColors.info;

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  if (!visible) return null;

  return (
    <div style={{
      backgroundColor: backgroundColor || colors.bg,
      color: textColor || colors.text,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontSize
    }}>
      {showIcon && (
        <i
          className={typeIcons[type]}
          style={{
            color: iconColor || colors.icon,
            fontSize: "20px",
            flexShrink: 0,
            marginTop: "2px"
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        {content}
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "none",
            border: "none",
            color: textColor || colors.text,
            cursor: "pointer",
            fontSize: "20px",
            padding: "0",
            lineHeight: 1,
            opacity: 0.6,
            transition: "opacity 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.opacity = "1"}
          onMouseLeave={(e) => e.target.style.opacity = "0.6"}
        >
          ×
        </button>
      )}
    </div>
  );
}
