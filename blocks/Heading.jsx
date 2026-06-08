export const json_config = {
  type: "Heading",
  label: "Heading",
  category: "Basic",
  description: "Heading text with customizable level",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Text",
      default: "Your Heading Here"
    },
    level: {
      type: "select",
      label: "Level",
      default: "h2",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"]
    },
    align: {
      type: "select",
      label: "Alignment",
      default: "left",
      options: ["left", "center", "right", "justify"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-4xl font-bold text-gray-900"
    }
  }
};

export default function Heading({ text = "Your Heading Here", level = "h2", className = "text-4xl font-bold text-gray-900", align = "left" }) {
  const Tag = level || "h2";
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify"
  }[align] || "text-left";
  return <Tag className={`${className} ${alignClass}`}>{text}</Tag>;
}
