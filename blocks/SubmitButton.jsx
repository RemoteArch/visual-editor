export const json_config = {
  type: "SubmitButton",
  label: "Submit Button",
  category: "Forms",
  description: "Form submit button",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Button Text",
      default: "Submit"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
    }
  }
};

export default function SubmitButton({ text = "Submit", className = "w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors" }) {
  return <button type="submit" className={className}>{text}</button>;
}
