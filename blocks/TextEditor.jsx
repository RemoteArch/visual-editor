export const json_config = {
  type: "TextEditor",
  label: "Text Editor",
  category: "Basic",
  description: "Rich text content",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "Write your content here. This is a text editor block that supports paragraphs, lists, and more."
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-base text-gray-600 leading-relaxed"
    }
  }
};

export default function TextEditor({ content = "Write your content here. This is a text editor block that supports paragraphs, lists, and more.", className = "text-base text-gray-600 leading-relaxed" }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />;
}
