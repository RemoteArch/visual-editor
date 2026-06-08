export const json_config = {
  type: "InnerSection",
  label: "Inner Section",
  category: "Layout",
  description: "Inner section for nested layouts",
  acceptsChildren: true,
  props: {
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "py-12 bg-gray-50"
    }
  }
};

export default function InnerSection({ children, className = "py-12 bg-gray-50" }) {
  return <div className={className}>{children}</div>;
}
