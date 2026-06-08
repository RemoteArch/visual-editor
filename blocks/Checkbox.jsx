export const json_config = {
  type: "Checkbox",
  label: "Checkbox",
  category: "Forms",
  description: "Checkbox input",
  acceptsChildren: false,
  props: {
    label: {
      type: "string",
      label: "Label",
      default: "Accept terms and conditions"
    },
    checked: {
      type: "boolean",
      label: "Checked",
      default: false
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

export default function Checkbox({ label = "Accept terms and conditions", checked = false, required = false, className = "" }) {
  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <input type="checkbox" defaultChecked={checked} required={required} className="w-4 h-4 text-indigo-600 rounded" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
