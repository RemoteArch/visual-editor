export const json_config = {
  type: "Copyright",
  label: "Copyright",
  category: "Widgets",
  description: "Copyright notice",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Copyright Text",
      default: "© 2024 Your Company. All rights reserved."
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-sm text-gray-500 text-center"
    }
  }
};

export default function Copyright({ text = "© 2024 Your Company. All rights reserved.", className = "text-sm text-gray-500 text-center" }) {
  return <div className={className}>{text}</div>;
}
