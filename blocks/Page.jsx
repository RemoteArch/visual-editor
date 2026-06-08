export const json_config = {
  type: "Page",
  label: "Page",
  category: "Page",
  description: "Root page container",
  acceptsChildren: true,
  isRoot: true,
  props: {
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "min-h-screen bg-white"
    }
  }
};

export default function Page({ children, className = "min-h-screen bg-white" }) {
  return <div className={className}>{children}</div>;
}
