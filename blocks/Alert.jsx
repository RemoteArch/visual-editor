export const json_config = {
  type: "Alert",
  label: "Alert",
  category: "Basic",
  description: "Alert message box",
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
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "p-4 rounded-lg"
    }
  }
};

export default function Alert({ type = "info", title = "Information", content = "This is an alert message", dismissible = false, className = "p-4 rounded-lg" }) {
  const typeStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800"
  };
  return (
    <div className={`border ${typeStyles[type]} ${className}`}>
      <div className="flex">
        <div className="flex-1">
          {title && <h4 className="font-semibold">{title}</h4>}
          <p>{content}</p>
        </div>
        {dismissible && <button className="ml-4">×</button>}
      </div>
    </div>
  );
}
