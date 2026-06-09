export const json_config = {
  type: "Icon",
  label: "Icon",
  category: "Basic",
  description: "Icon element",
  icon: "fa-solid fa-star",
  acceptsChildren: false,
  props: {
    icon: {
      type: "select",
      label: "Icon",
      default: "star",
      options: ["star", "heart", "check", "close", "arrow-right", "arrow-left", "arrow-up", "arrow-down", "search", "menu", "user", "settings", "home", "mail", "phone", "calendar", "clock", "location", "bolt", "shield", "bell", "bookmark", "share", "download", "upload", "edit", "delete", "add", "remove", "info", "warning", "error", "success"]
    },
    size: {
      type: "select",
      label: "Size",
      default: "24",
      options: ["16", "20", "24", "32", "48", "64"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#4f46e5"
    }
  }
};

export default function Icon({ icon = "star", size = "24", color = "#4f46e5" }) {
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
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: `${size}px`, color }}
    >
      {icons[icon] || "★"}
    </span>
  );
}
