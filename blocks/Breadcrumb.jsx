export const json_config = {
  type: "Breadcrumb",
  label: "Breadcrumb",
  category: "Widgets",
  description: "Breadcrumb navigation",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "Items (format: Label|URL per line)",
      default: "Home|#\nCategory|#\nCurrent Page|#"
    },
    separator: {
      type: "string",
      label: "Separator",
      default: "/"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "flex items-center gap-2 text-sm"
    }
  }
};

export default function Breadcrumb({ items = "Home|#\nCategory|#\nCurrent Page|#", separator = "/", className = "flex items-center gap-2 text-sm" }) {
  const itemList = typeof items === "string"
    ? items.split("\n").filter(i => i.trim()).map(i => {
      const [label, href] = i.split("|");
      return { label: label?.trim() || "Home", href: href?.trim() || "#" };
    })
    : items;
  
  return (
    <nav className={className}>
      {itemList.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">{separator}</span>}
          <a href={item.href} className="text-gray-600 hover:text-gray-900">
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}
