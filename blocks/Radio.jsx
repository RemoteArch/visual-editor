export const json_config = {
  type: "Radio",
  label: "Radio",
  category: "Forms",
  description: "Radio button group",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Choose an option"
    },
    name: {
      type: "string",
      label: "Group Name",
      default: "radio-group"
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
      default: ""
    }
  }
};

export default function Radio({ label = "Choose an option", name = "radio-group", options = "Option 1\nOption 2\nOption 3", required = false, className = "" }) {
  const optionList = typeof options === "string" ? options.split("\n").filter(o => o.trim()) : options;
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="space-y-2">
        {optionList.map((opt, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt}
              required={required}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
