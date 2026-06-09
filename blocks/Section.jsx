export const json_config = {
  type: "Section",
  label: "Section",
  category: "Layout",
  description: "Full-width section container",
  icon: "fa-solid fa-layer-group",
  acceptsChildren: true,
  props: {
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "80",
      options: ["0", "20", "40", "60", "80", "100", "120"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    }
  }
};

export default function Section({ children, paddingY = "80", backgroundColor = "#ffffff" }) {
  return (
    <section style={{ padding: `${paddingY}px 0`, backgroundColor }}>
      {children}
    </section>
  );
}
