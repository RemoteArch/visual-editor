export const json_config = {
  type: "Logo",
  label: "Logo",
  category: "Widgets",
  description: "Logo / brand element",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Brand Text",
      default: "Your Brand"
    },
    href: {
      type: "string",
      label: "Link",
      default: "#"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-2xl font-bold text-indigo-600"
    }
  }
};

export default function Logo({ text = "Your Brand", href = "#", className = "text-2xl font-bold text-indigo-600" }) {
  return (
    <a href={href} className={className}>
      {text}
    </a>
  );
}
