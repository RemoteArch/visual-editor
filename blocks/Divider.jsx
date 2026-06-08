export const json_config = {
  type: "Divider",
  label: "Divider",
  category: "Basic",
  description: "Horizontal divider line",
  acceptsChildren: false,
  props: {
    style: {
      type: "select",
      label: "Style",
      default: "solid",
      options: ["solid", "dashed", "dotted", "double"]
    },
    thickness: {
      type: "select",
      label: "Thickness",
      default: "1",
      options: ["1", "2", "4", "8"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#e5e7eb"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "my-8"
    }
  }
};

export default function Divider({ style = "solid", thickness = "1", color = "#e5e7eb", className = "my-8" }) {
  return (
    <hr
      className={className}
      style={{
        borderStyle: style,
        borderWidth: `${thickness}px`,
        borderColor: color
      }}
    />
  );
}
