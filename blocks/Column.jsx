export const json_config = {
  type: "Column",
  label: "Column",
  category: "Layout",
  description: "Single column",
  icon: "fa-solid fa-grip-vertical",
  acceptsChildren: true,
  props: {
    padding: {
      type: "select",
      label: "Padding (px)",
      default: "0",
      options: ["0", "8", "16", "24", "32"]
    }
  }
};

export default function Column({ children, padding = "0" }) {
  return <div style={{ padding: `${padding}px` }}>{children}</div>;
}
