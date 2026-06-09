import React from "react";

export const json_config = {
  type: "Toggle",
  label: "Toggle",
  category: "Elements",
  description: "Toggle switch for on/off states",
  icon: "fa-solid fa-toggle-on",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Enable Feature"
    },
    checked: {
      type: "boolean",
      label: "Default Checked",
      default: false
    },
    disabled: {
      type: "boolean",
      label: "Disabled",
      default: false
    },
    activeColor: {
      type: "color",
      label: "Active Color",
      default: "#4f46e5"
    },
    inactiveColor: {
      type: "color",
      label: "Inactive Color",
      default: "#d1d5db"
    },
    labelColor: {
      type: "color",
      label: "Label Color",
      default: "#111827"
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "12px",
      options: ["8px", "12px", "16px", "20px"]
    },
    size: {
      type: "select",
      label: "Toggle Size",
      default: "medium",
      options: ["small", "medium", "large"]
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
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

export default function Toggle({ 
  label = "Enable Feature",
  checked = false,
  disabled = false,
  activeColor = "#4f46e5",
  inactiveColor = "#d1d5db",
  labelColor = "#111827",
  fontSize = "16px",
  gap = "12px",
  size = "medium",
  padding = "16px",
  backgroundColor = "transparent",
  borderRadius = "8px",
  align = "left",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const sizeMap = {
    small: { width: "36px", height: "20px", circle: "14px" },
    medium: { width: "48px", height: "26px", circle: "20px" },
    large: { width: "60px", height: "32px", circle: "26px" }
  };

  const currentSize = sizeMap[size];

  return (
    <div style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      marginTop,
      marginBottom,
      display: "flex",
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"
    }}>
      <label style={{
        display: "flex",
        alignItems: "center",
        gap,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}>
        <div style={{
          position: "relative",
          width: currentSize.width,
          height: currentSize.height,
          backgroundColor: isChecked ? activeColor : inactiveColor,
          borderRadius: "9999px",
          transition: "background-color 0.2s ease"
        }}>
          <div style={{
            position: "absolute",
            top: "2px",
            left: isChecked ? `calc(${currentSize.width} - ${currentSize.circle} - 2px)` : "2px",
            width: currentSize.circle,
            height: currentSize.circle,
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            transition: "left 0.2s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
          }} />
        </div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => !disabled && setIsChecked(e.target.checked)}
          disabled={disabled}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none"
          }}
        />
        <span style={{
          color: labelColor,
          fontSize,
          fontWeight: "500"
        }}>
          {label}
        </span>
      </label>
    </div>
  );
}
