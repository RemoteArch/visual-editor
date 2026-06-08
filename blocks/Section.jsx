export const json_config = {
  type: "Section",
  label: "Section",
  category: "Layout",
  description: "Full-width section container",
  acceptsChildren: true,
  props: {
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "py-20 bg-white"
    }
  }
};

export default function Section({ children, className = "py-20 bg-white" }) {
  return <section className={className}>{children}</section>;
}
