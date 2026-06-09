export const json_config = {
  type: "Alert",
  label: "Alert",
  category: "Basic",
  description: "Alert message box",
  icon: "fa-solid fa-triangle-exclamation",
  acceptsChildren: false,
  props: {
    type: {
      type: "select",
      label: "Type",
      default: "info",
      options: ["info", "success", "warning", "error"]
    },
    title: {
      type: "string",
      label: "Title",
      default: "Information"
    },
    content: {
      type: "textarea",
      label: "Content",
      default: "This is an alert message"
    },
    dismissible: {
      type: "boolean",
      label: "Dismissible",
      default: false
    }
  }
};

export default function Alert({ type = "info", title = "Information", content = "This is an alert message", dismissible = false }) {
  const typeStyles = {
    info: { bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
    success: { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534" },
    warning: { bg: "#fefce8", border: "#fef9c3", text: "#854d0e" },
    error: { bg: "#fef2f2", border: "#fecaca", text: "#991b1b" }
  };
  const style = typeStyles[type];
  return (
    <div style={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, color: style.text, padding: "16px", borderRadius: "8px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {title && <h4 style={{ fontWeight: "600" }}>{title}</h4>}
          <p>{content}</p>
        </div>
        {dismissible && <button style={{ marginLeft: "16px", cursor: "pointer" }}>×</button>}
      </div>
    </div>
  );
}
