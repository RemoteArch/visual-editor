export const json_config = {
  type: "Form",
  label: "Form",
  category: "Forms",
  description: "Form container",
  acceptsChildren: true,
  props: {
    action: {
      type: "string",
      label: "Action URL",
      default: "#"
    },
    method: {
      type: "select",
      label: "Method",
      default: "POST",
      options: ["GET", "POST"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "space-y-4"
    }
  }
};

export default function Form({ children, action = "#", method = "POST", className = "space-y-4" }) {
  return (
    <form action={action} method={method} className={className}>
      {children}
    </form>
  );
}
