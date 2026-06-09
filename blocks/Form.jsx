export const json_config = {
  type: "Form",
  label: "Form",
  category: "Forms",
  description: "Form container",
  icon: "fa-solid fa-file-signature",
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
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["0", "8", "16", "24", "32"]
    }
  }
};

export default function Form({ children, action = "#", method = "POST", gap = "16" }) {
  return (
    <form action={action} method={method} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
      {children}
    </form>
  );
}
