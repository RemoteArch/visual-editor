export const json_config = {
  type: "Menu",
  label: "Menu",
  category: "Widgets",
  description: "Navigation menu",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "Items (format: Label|URL per line)",
      default: "Home|#\nAbout|#\nServices|#\nContact|#"
    },
    orientation: {
      type: "select",
      label: "Orientation",
      default: "horizontal",
      options: ["horizontal", "vertical"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Menu({ items = "Home|#\nAbout|#\nServices|#\nContact|#", orientation = "horizontal", className = "" }) {
  const itemList = typeof items === "string"
    ? items.split("\n").filter(i => i.trim()).map(i => {
      const [label, href] = i.split("|");
      return { label: label?.trim() || "Home", href: href?.trim() || "#" };
    })
    : items;
  
  const orientationClass = orientation === "horizontal" ? "flex-row" : "flex-col";
  
  return (
    <nav className={`flex ${orientationClass} gap-4 ${className}`}>
      {itemList.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="text-gray-700 hover:text-indigo-600 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
