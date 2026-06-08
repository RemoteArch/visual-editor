export const json_config = {
  type: "Container",
  label: "Container",
  category: "Layout",
  description: "Centered container with max-width",
  acceptsChildren: true,
  props: {
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "max-w-6xl mx-auto px-6 py-16"
    }
  }
};

export default function Container({ children, className = "max-w-6xl mx-auto px-6 py-16" }) {
  return <div className={className}>{children}</div>;
}
