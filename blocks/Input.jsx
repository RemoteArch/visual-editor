export const json_config = {
  type: "Input",
  label: "Input",
  category: "Forms",
  description: "Text input field",
  acceptsChildren: false,
  props: {
    type: {
      type: "select",
      label: "Type",
      default: "text",
      options: ["text", "email", "password", "tel", "url", "number", "date", "time", "datetime-local"]
    },
    label: {
      type: "string",
      label: "Label",
      default: "Label"
    },
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Enter text..."
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

export default function Input({ type = "text", label = "Label", placeholder = "Enter text...", required = false, className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={className}
      />
    </div>
  );
}
