export const json_config = {
  type: "Paragraph",
  label: "Paragraph",
  category: "Typography",
  description: "Paragraph text",
  icon: "fa-solid fa-paragraph",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16",
      options: ["14", "16", "18", "20"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#4b5563"
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      default: "1.75",
      options: ["1.5", "1.6", "1.75", "2"]
    }
  }
};

export default function Paragraph({ content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", fontSize = "16", color = "#4b5563", lineHeight = "1.75" }) {
  return <p style={{ fontSize: `${fontSize}px`, color, lineHeight }}>{content}</p>;
}
