export const json_config = {
  type: "IconBox",
  label: "Icon Box",
  category: "Basic",
  description: "Icon with text box",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "p-6 bg-white rounded-lg shadow-md text-center"
    }
  }
};

export default function IconBox({ icon = "star", title = "Icon Box Title", description = "Add a description for your icon box", position = "top", className = "p-6 bg-white rounded-lg shadow-md text-center" }) {
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
  const layoutStyles = {
    top: "flex-col",
    left: "flex-row",
    right: "flex-row-reverse"
  };
  return (
    <div className={`flex ${layoutStyles[position]} items-center gap-4 ${className}`}>
      <span className="text-4xl text-indigo-600">{icons[icon] || "★"}</span>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
