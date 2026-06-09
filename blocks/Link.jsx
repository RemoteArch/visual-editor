export const json_config = {
  type: "Link",
  label: "Link",
  category: "Typography",
  description: "Text link",
  icon: "fa-solid fa-link",
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
    color: {
      type: "color",
      label: "Color",
      default: "#2563eb"
    }
  }
};

export default function Link({ text = "Click here", href = "#", target = "_self", color = "#2563eb" }) {
  return <a href={href} target={target} style={{ color, textDecoration: "underline" }}>{text}</a>;
}
