export const json_config = {
  type: "Copyright",
  label: "Copyright",
  category: "Widgets",
  description: "Copyright notice",
  icon: "fa-solid fa-copyright",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Copyright Text",
      default: "© 2024 Your Company. All rights reserved."
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "14",
      options: ["12", "14", "16"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#6b7280"
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "center",
      options: ["left", "center", "right"]
    }
  }
};

export default function Copyright({ text = "© 2024 Your Company. All rights reserved.", fontSize = "14", color = "#6b7280", textAlign = "center" }) {
  return <div style={{ fontSize: `${fontSize}px`, color, textAlign }}>{text}</div>;
}
