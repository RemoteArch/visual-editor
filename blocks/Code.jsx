export const json_config = {
  type: "Code",
  label: "Code",
  category: "Typography",
  description: "Code block",
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
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Code({ content = "console.log('Hello World');", language = "javascript", inline = false, className = "" }) {
  if (inline) {
    return <code className={`bg-gray-100 px-1 py-0.5 rounded text-sm ${className}`}>{content}</code>;
  }
  return (
    <pre className={`bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto ${className}`}>
      <code>{content}</code>
    </pre>
  );
}
