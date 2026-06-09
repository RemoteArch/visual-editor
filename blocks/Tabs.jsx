

export const json_config = {
  type: "Tabs",
  label: "Tabs",
  category: "Advanced",
  description: "Tabbed content container",
  icon: "fa-solid fa-folder",
  acceptsChildren: true,
  props: {
    titles: {
      type: "textarea",
      label: "Tab Titles (one per line)",
      default: "Tab 1\nTab 2\nTab 3"
    },
    activeColor: {
      type: "color",
      label: "Active Color",
      default: "#4f46e5"
    },
    inactiveColor: {
      type: "color",
      label: "Inactive Color",
      default: "#6b7280"
    }
  }
};

export default function Tabs({ children, titles = "Tab 1\nTab 2\nTab 3", activeColor = "#4f46e5", inactiveColor = "#6b7280" }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const childArray = React.Children.toArray(children);
  const titleList = typeof titles === "string" ? titles.split("\n").filter(t => t.trim()) : titles;

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        {titleList.map((title, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "8px 16px",
              fontWeight: "500",
              color: activeTab === index ? activeColor : inactiveColor,
              borderBottom: activeTab === index ? `2px solid ${activeColor}` : "none",
              cursor: "pointer",
              background: "none",
              border: "none"
            }}
          >
            {title}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px" }}>
        {childArray[activeTab] || null}
      </div>
    </div>
  );
}
