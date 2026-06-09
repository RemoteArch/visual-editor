export const json_config = {
  type: "Code",
  label: "Code",
  category: "Typography",
  description: "Code block",
  icon: "fa-solid fa-code",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Code",
      default: "console.log('Hello World');"
    },
    language: {
      type: "select",
      label: "Language",
      default: "javascript",
      options: ["javascript", "html", "css", "python", "java", "cpp", "text"]
    },
    inline: {
      type: "boolean",
      label: "Inline",
      default: false
    }
  }
};

export default function Code({ content = "console.log('Hello World');", language = "javascript", inline = false }) {
  if (inline) {
    return <code style={{ backgroundColor: "#f3f4f6", padding: "2px 4px", borderRadius: "4px", fontSize: "14px" }}>{content}</code>;
  }
  return (
    <pre style={{ backgroundColor: "#111827", color: "#f9fafb", padding: "16px", borderRadius: "8px", overflowX: "auto" }}>
      <code>{content}</code>
    </pre>
  );
}
