

export const json_config = {
  type: "Accordion",
  label: "Accordion",
  category: "Advanced",
  description: "Collapsible accordion",
  icon: "fa-solid fa-angles-up-down",
  acceptsChildren: true,
  props: {
    titles: {
      type: "textarea",
      label: "Item Titles (one per line)",
      default: "Item 1\nItem 2\nItem 3"
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#e5e7eb"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#4b5563"
    }
  }
};

export default function Accordion({ children, titles = "Item 1\nItem 2\nItem 3", borderColor = "#e5e7eb", textColor = "#4b5563" }) {
  const [openIndex, setOpenIndex] = React.useState(0);
  const childArray = React.Children.toArray(children);
  const titleList = typeof titles === "string" ? titles.split("\n").filter(t => t.trim()) : titles;

  return (
    <div>
      {childArray.map((child, index) => (
        <div key={index} style={{ border: `1px solid ${borderColor}`, borderRadius: "8px", marginBottom: "8px" }}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            style={{
              width: "100%",
              padding: "12px 16px",
              textAlign: "left",
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            {titleList[index] || `Item ${index + 1}`}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <div style={{ padding: "16px", color: textColor }}>
              {child}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
