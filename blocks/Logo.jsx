export const json_config = {
  type: "Logo",
  label: "Logo",
  category: "Widgets",
  description: "Logo / brand element",
  icon: "fa-solid fa-shapes",
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
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "24",
      options: ["16", "20", "24", "32", "40"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "700",
      options: ["400", "500", "600", "700", "800"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#4f46e5"
    }
  }
};

export default function Logo({ text = "Your Brand", href = "#", fontSize = "24", fontWeight = "700", color = "#4f46e5" }) {
  return (
    <a href={href} style={{ fontSize: `${fontSize}px`, fontWeight, color, textDecoration: "none" }}>
      {text}
    </a>
  );
}
