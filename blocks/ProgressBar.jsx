export const json_config = {
  type: "ProgressBar",
  label: "Progress Bar",
  category: "Advanced",
  description: "Progress bar",
  acceptsChildren: false,
  props: {
    value: {
      type: "number",
      label: "Value",
      default: 75
    },
    max: {
      type: "number",
      label: "Maximum",
      default: 100
    },
    showLabel: {
      type: "boolean",
      label: "Show Label",
      default: true
    },
    color: {
      type: "select",
      label: "Color",
      default: "indigo",
      options: ["indigo", "blue", "green", "yellow", "red", "purple", "pink"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function ProgressBar({ value = 75, max = 100, showLabel = true, color = "indigo", className = "" }) {
  const colorClasses = {
    indigo: "bg-indigo-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600"
  };
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={className}>
      {showLabel && <div className="text-sm text-gray-600 mb-1">{percentage}%</div>}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${colorClasses[color]} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
