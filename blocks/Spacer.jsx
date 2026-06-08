export const json_config = {
  type: "Spacer",
  label: "Spacer",
  category: "Basic",
  description: "Vertical space",
  acceptsChildren: false,
  props: {
    height: {
      type: "string",
      label: "Height (px)",
      default: "40"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Spacer({ height = "40", className = "" }) {
  return <div className={className} style={{ height: `${height}px` }} aria-hidden="true" />;
}
