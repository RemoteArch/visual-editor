export const json_config = {
  type: "Link",
  label: "Link",
  category: "Typography",
  description: "Text link",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Link Text",
      default: "Click here"
    },
    href: {
      type: "string",
      label: "URL",
      default: "#"
    },
    target: {
      type: "select",
      label: "Target",
      default: "_self",
      options: ["_self", "_blank", "_parent", "_top"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-blue-600 hover:text-blue-800 underline"
    }
  }
};

export default function Link({ text = "Click here", href = "#", target = "_self", className = "text-blue-600 hover:text-blue-800 underline" }) {
  return <a href={href} target={target} className={className}>{text}</a>;
}
