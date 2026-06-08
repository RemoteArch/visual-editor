export const json_config = {
  type: "Paragraph",
  label: "Paragraph",
  category: "Typography",
  description: "Paragraph text",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-base text-gray-600 leading-relaxed"
    }
  }
};

export default function Paragraph({ content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", className = "text-base text-gray-600 leading-relaxed" }) {
  return <p className={className}>{content}</p>;
}
