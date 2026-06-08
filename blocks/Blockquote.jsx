export const json_config = {
  type: "Blockquote",
  label: "Blockquote",
  category: "Typography",
  description: "Blockquote citation",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "border-l-4 border-indigo-500 pl-4 italic text-gray-700"
    }
  }
};

export default function Blockquote({ content = "This is a blockquote. It's great for highlighting important text or citations.", author = "", className = "border-l-4 border-indigo-500 pl-4 italic text-gray-700" }) {
  return (
    <blockquote className={className}>
      <p>{content}</p>
      {author && <cite className="text-sm text-gray-500">— {author}</cite>}
    </blockquote>
  );
}
