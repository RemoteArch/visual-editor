export const json_config = {
  type: "TextEditor",
  label: "Text Editor",
  category: "Basic",
  description: "Rich text content",
  icon: "fa-solid fa-align-left",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "Write your content here. This is a text editor block that supports paragraphs, lists, and more."
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

export default function TextEditor({ content = "Write your content here. This is a text editor block that supports paragraphs, lists, and more.", fontSize = "16", color = "#4b5563", lineHeight = "1.75" }) {
  return <div style={{ fontSize: `${fontSize}px`, color, lineHeight }} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />;
}
