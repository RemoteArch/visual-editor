export const json_config = {
  type: "Column",
  label: "Column",
  category: "Layout",
  description: "Single column",
  acceptsChildren: true,
  props: {
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Column({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
