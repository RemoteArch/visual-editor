export const json_config = {
  type: "InnerSection",
  label: "Inner Section",
  category: "Layout",
  description: "Inner section for nested layouts",
  icon: "fa-solid fa-square",
  acceptsChildren: true,
  props: {
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "48",
      options: ["0", "20", "40", "48", "60", "80"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#f9fafb"
    }
  }
};

export default function InnerSection({ children, paddingY = "48", backgroundColor = "#f9fafb" }) {
  return (
    <div style={{ padding: `${paddingY}px 0`, backgroundColor }}>
      {children}
    </div>
  );
}
