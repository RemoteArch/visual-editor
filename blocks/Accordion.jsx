

export const json_config = {
  type: "Accordion",
  label: "Accordion",
  category: "Advanced",
  description: "Collapsible accordion",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "Items (format: Title|Content per line)",
      default: "Item 1|Content for item 1\nItem 2|Content for item 2\nItem 3|Content for item 3"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Accordion({ items = "Item 1|Content for item 1\nItem 2|Content for item 2\nItem 3|Content for item 3", className = "" }) {
  const [openIndex, setOpenIndex] = React.useState(0);
  const itemList = typeof items === "string"
    ? items.split("\n").filter(i => i.trim()).map(i => {
      const [title, content] = i.split("|");
      return { title: title?.trim() || "Item", content: content?.trim() || "" };
    })
    : items;
  
  return (
    <div className={className}>
      {itemList.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg mb-2">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full px-4 py-3 text-left font-medium flex justify-between items-center"
          >
            {item.title}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 pt-2 text-gray-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
