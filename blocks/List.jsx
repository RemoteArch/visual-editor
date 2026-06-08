export const json_config = {
  type: "List",
  label: "List",
  category: "Typography",
  description: "List (ordered or unordered)",
  acceptsChildren: false,
  props: {
    type: {
      type: "select",
      label: "Type",
      default: "ul",
      options: ["ul", "ol"]
    },
    items: {
      type: "textarea",
      label: "Items (one per line)",
      default: "Item 1\nItem 2\nItem 3"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "list-disc list-inside space-y-2"
    }
  }
};

export default function List({ type = "ul", items = "Item 1\nItem 2\nItem 3", className = "list-disc list-inside space-y-2" }) {
  const ListTag = type === "ol" ? "ol" : "ul";
  const listItems = typeof items === "string" ? items.split("\n").filter(i => i.trim()) : items;
  return (
    <ListTag className={className}>
      {listItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListTag>
  );
}
