export const json_config = {
  type: "List",
  label: "List",
  category: "Typography",
  description: "List (ordered or unordered)",
  icon: "fa-solid fa-list",
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
    listStyle: {
      type: "select",
      label: "List Style",
      default: "disc",
      options: ["disc", "circle", "square", "decimal", "none"]
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    }
  }
};

export default function List({ type = "ul", items = "Item 1\nItem 2\nItem 3", listStyle = "disc", gap = "8" }) {
  const ListTag = type === "ol" ? "ol" : "ul";
  const listItems = typeof items === "string" ? items.split("\n").filter(i => i.trim()) : items;
  return (
    <ListTag style={{ listStyle, paddingLeft: "20px" }}>
      {listItems.map((item, index) => (
        <li key={index} style={{ marginBottom: index < listItems.length - 1 ? `${gap}px` : "0" }}>{item}</li>
      ))}
    </ListTag>
  );
}
