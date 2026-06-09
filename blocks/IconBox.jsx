export const json_config = {
  type: "IconBox",
  label: "Icon Box",
  category: "Basic",
  description: "Icon with text box",
  icon: "fa-solid fa-box",
  acceptsChildren: false,
  props: {
    icon: {
      type: "select",
      label: "Icon",
      default: "star",
      options: ["star", "heart", "check", "close", "arrow-right", "arrow-left", "arrow-up", "arrow-down", "search", "menu", "user", "settings", "home", "mail", "phone", "calendar", "clock", "location", "bolt", "shield", "bell", "bookmark", "share", "download", "upload", "edit", "delete", "add", "remove", "info", "warning", "error", "success"]
    },
    title: {
      type: "string",
      label: "Title",
      default: "Icon Box Title"
    },
    description: {
      type: "textarea",
      label: "Description",
      default: "Add a description for your icon box"
    },
    position: {
      type: "select",
      label: "Icon Position",
      default: "top",
      options: ["top", "left", "right"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24",
      options: ["16", "24", "32"]
    }
  }
};

export default function IconBox({ icon = "star", title = "Icon Box Title", description = "Add a description for your icon box", position = "top", backgroundColor = "#ffffff", padding = "24" }) {
  const icons = {
    star: "★",
    heart: "♥",
    check: "✓",
    close: "✕",
    "arrow-right": "→",
    "arrow-left": "←",
    "arrow-up": "↑",
    "arrow-down": "↓",
    search: "🔍",
    menu: "☰",
    user: "👤",
    settings: "⚙",
    home: "⌂",
    mail: "✉",
    phone: "☎",
    calendar: "📅",
    clock: "🕐",
    location: "📍",
    bolt: "⚡",
    shield: "🛡",
    bell: "🔔",
    bookmark: "🔖",
    share: "⤤",
    download: "⬇",
    upload: "⬆",
    edit: "✎",
    delete: "✖",
    add: "+",
    remove: "−",
    info: "ℹ",
    warning: "⚠",
    error: "✖",
    success: "✓"
  };
  const flexDirection = position === "top" ? "column" : position === "left" ? "row" : "row-reverse";
  const textAlign = position === "top" ? "center" : "left";
  return (
    <div style={{ display: "flex", flexDirection, alignItems: "center", gap: "16px", padding: `${padding}px`, backgroundColor, borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", textAlign }}>
      <span style={{ fontSize: "36px", color: "#4f46e5" }}>{icons[icon] || "★"}</span>
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>{title}</h3>
        <p style={{ color: "#4b5563" }}>{description}</p>
      </div>
    </div>
  );
}
