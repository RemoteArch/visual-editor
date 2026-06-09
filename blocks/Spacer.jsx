export const json_config = {
  type: "Spacer",
  label: "Spacer",
  category: "Basic",
  description: "Vertical space",
  icon: "fa-solid fa-arrows-up-down",
  acceptsChildren: false,
  props: {
    height: {
      type: "select",
      label: "Height (px)",
      default: "40",
      options: ["10", "20", "40", "60", "80", "100"]
    }
  }
};

export default function Spacer({ height = "40" }) {
  return <div style={{ height: `${height}px` }} aria-hidden="true" />;
}
