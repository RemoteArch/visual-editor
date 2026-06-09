export const json_config = {
  type: "Blockquote",
  label: "Blockquote",
  category: "Typography",
  description: "Blockquote citation",
  icon: "fa-solid fa-quote-left",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "This is a blockquote. It's great for highlighting important text or citations."
    },
    author: {
      type: "string",
      label: "Author",
      default: ""
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#6366f1"
    },
    color: {
      type: "color",
      label: "Text Color",
      default: "#374151"
    }
  }
};

export default function Blockquote({ content = "This is a blockquote. It's great for highlighting important text or citations.", author = "", borderColor = "#6366f1", color = "#374151" }) {
  return (
    <blockquote style={{ borderLeft: `4px solid ${borderColor}`, paddingLeft: "16px", fontStyle: "italic", color }}>
      <p>{content}</p>
      {author && <cite style={{ fontSize: "14px", color: "#6b7280" }}>— {author}</cite>}
    </blockquote>
  );
}
