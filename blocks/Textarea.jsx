export const json_config = {
  type: "Textarea",
  label: "Textarea",
  category: "Forms",
  description: "Textarea field",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Label"
    },
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Enter your message..."
    },
    rows: {
      type: "select",
      label: "Rows",
      default: "4",
      options: ["2", "3", "4", "6", "8"]
    },
    required: {
      type: "boolean",
      label: "Required",
      default: false
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    }
  }
};

export default function Textarea({ label = "Label", placeholder = "Enter your message...", rows = 4, required = false, className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={className}
      />
    </div>
  );
}
