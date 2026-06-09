export const json_config = {
  type: "Divider",
  label: "Divider",
  category: "Basic",
  description: "Horizontal divider line",
  icon: "fa-solid fa-minus",
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
    marginY: {
      type: "select",
      label: "Margin Y",
      default: "32",
      options: ["0", "16", "32", "48", "64"]
    }
  }
};

export default function Divider({ style = "solid", thickness = "1", color = "#e5e7eb", marginY = "32" }) {
  return (
    <hr
      style={{
        borderStyle: style,
        borderWidth: `${thickness}px`,
        borderColor: color,
        margin: `${marginY}px 0`
      }}
    />
  );
}
