export const json_config = {
  type: "Page",
  label: "Page",
  category: "Page",
  description: "Root page container",
  acceptsChildren: true,
  isRoot: true,
  props: {
    minHeight: {
      type: "select",
      label: "Min Height",
      default: "100vh",
      options: ["auto", "100vh", "100%"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    }
  }
};

export default function Page({ children, minHeight = "100vh", backgroundColor = "#ffffff" }) {
  return <div style={{ minHeight, backgroundColor }}>{children}</div>;
}
