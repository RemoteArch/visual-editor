export const json_config = {
  type: "SearchBar",
  label: "Search Bar",
  category: "Widgets",
  description: "Search input",
  acceptsChildren: false,
  props: {
    placeholder: {
      type: "string",
      label: "Placeholder",
      default: "Search..."
    },
    button: {
      type: "boolean",
      label: "Show Button",
      default: true
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "flex gap-2"
    }
  }
};

export default function SearchBar({ placeholder = "Search...", button = true, className = "flex gap-2" }) {
  return (
    <div className={className}>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      {button && (
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Search
        </button>
      )}
    </div>
  );
}
