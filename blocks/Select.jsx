export const json_config = {
  type: "Select",
  label: "Select",
  category: "Forms",
  description: "Select dropdown",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Label"
    },
    options: {
      type: "textarea",
      label: "Options (one per line)",
      default: "Option 1\nOption 2\nOption 3"
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

export default function Select({ label = "Label", options = "Option 1\nOption 2\nOption 3", required = false, className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" }) {
  const optionList = typeof options === "string" ? options.split("\n").filter(o => o.trim()) : options;
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select required={required} className={className}>
        {optionList.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
