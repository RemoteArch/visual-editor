export const json_config = {
  type: "Heading",
  label: "Heading",
  category: "Basic",
  description: "Heading text with customizable level",
  icon: "fa-solid fa-heading",
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
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "36",
      options: ["24", "30", "36", "48", "60"]
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
      default: "#111827"
    }
  }
};

export default function Heading({ text = "Your Heading Here", level = "h2", align = "left", fontSize = "36", fontWeight = "700", color = "#111827" }) {
  const Tag = level || "h2";
  return (
    <Tag style={{ textAlign: align, fontSize: `${fontSize}px`, fontWeight, color }}>
      {text}
    </Tag>
  );
}
