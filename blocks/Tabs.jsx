

export const json_config = {
  type: "Tabs",
  label: "Tabs",
  category: "Advanced",
  description: "Tabbed content",
  acceptsChildren: false,
  props: {
    tabs: {
      type: "textarea",
      label: "Tabs (format: Title|Content per line)",
      default: "Tab 1|Content for tab 1\nTab 2|Content for tab 2\nTab 3|Content for tab 3"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Tabs({ tabs = "Tab 1|Content for tab 1\nTab 2|Content for tab 2\nTab 3|Content for tab 3", className = "" }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabList = typeof tabs === "string" 
    ? tabs.split("\n").filter(t => t.trim()).map(t => {
      const [title, content] = t.split("|");
      return { title: title?.trim() || "Tab", content: content?.trim() || "" };
    })
    : tabs;
  
  return (
    <div className={className}>
      <div className="flex border-b border-gray-200">
        {tabList.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium ${
              activeTab === index
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="p-4">
        <p>{tabList[activeTab]?.content || ""}</p>
      </div>
    </div>
  );
}
