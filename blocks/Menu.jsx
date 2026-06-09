export const json_config = {
  type: "Menu",
  label: "Menu",
  category: "Widgets",
  description: "Navigation menu",
  icon: "fa-solid fa-bars",
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
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["8", "16", "24", "32"]
    },
    color: {
      type: "color",
      label: "Text Color",
      default: "#374151"
    },
    hoverColor: {
      type: "color",
      label: "Hover Color",
      default: "#4f46e5"
    }
  }
};

export default function Menu({ items = "Home|#\nAbout|#\nServices|#\nContact|#", orientation = "horizontal", gap = "16", color = "#374151", hoverColor = "#4f46e5" }) {
  const itemList = typeof items === "string"
    ? items.split("\n").filter(i => i.trim()).map(i => {
      const [label, href] = i.split("|");
      return { label: label?.trim() || "Home", href: href?.trim() || "#" };
    })
    : items;

  const flexDirection = orientation === "horizontal" ? "row" : "column";

  return (
    <nav style={{ display: "flex", flexDirection, gap: `${gap}px` }}>
      {itemList.map((item, index) => (
        <a
          key={index}
          href={item.href}
          style={{ color, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = color}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
