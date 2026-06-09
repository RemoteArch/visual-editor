export const json_config = {
  type: "Breadcrumb",
  label: "Breadcrumb",
  category: "Widgets",
  description: "Breadcrumb navigation",
  icon: "fa-solid fa-angle-right",
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
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "8",
      options: ["4", "8", "12", "16"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "14",
      options: ["12", "14", "16"]
    },
    color: {
      type: "color",
      label: "Text Color",
      default: "#4b5563"
    },
    separatorColor: {
      type: "color",
      label: "Separator Color",
      default: "#9ca3af"
    }
  }
};

export default function Breadcrumb({ items = "Home|#\nCategory|#\nCurrent Page|#", separator = "/", gap = "8", fontSize = "14", color = "#4b5563", separatorColor = "#9ca3af" }) {
  const itemList = typeof items === "string"
    ? items.split("\n").filter(i => i.trim()).map(i => {
      const [label, href] = i.split("|");
      return { label: label?.trim() || "Home", href: href?.trim() || "#" };
    })
    : items;

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: `${gap}px`, fontSize: `${fontSize}px` }}>
      {itemList.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span style={{ color: separatorColor }}>{separator}</span>}
          <a href={item.href} style={{ color, textDecoration: "none" }}>
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}
