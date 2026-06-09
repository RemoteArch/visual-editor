export const json_config = {
  type: "Divider",
  label: "Divider",
  category: "Elements",
  description: "Horizontal or vertical divider line with customizable styling",
  icon: "fa-solid fa-minus",
  acceptsChildren: false,
  props: {
    orientation: {
      type: "select",
      label: "Orientation",
      default: "horizontal",
      options: ["horizontal", "vertical"]
    },
    thickness: {
      type: "select",
      label: "Thickness",
      default: "1px",
      options: ["1px", "2px", "3px", "4px", "5px", "6px"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#e5e7eb"
    },
    style: {
      type: "select",
      label: "Style",
      default: "solid",
      options: ["solid", "dashed", "dotted", "double"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "100%",
      options: ["100%", "75%", "50%", "25%", "auto", "200px", "300px", "400px", "500px"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "auto",
      options: ["auto", "100%", "200px", "300px", "400px", "100vh"]
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "64px", "1rem", "2rem"]
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "64px", "1rem", "2rem"]
    },
    marginLeft: {
      type: "select",
      label: "Margin Left",
      default: "0",
      options: ["0", "auto", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    marginRight: {
      type: "select",
      label: "Margin Right",
      default: "0",
      options: ["0", "auto", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    }
  }
};

export default function Divider({ 
  orientation = "horizontal", 
  thickness = "1px", 
  color = "#e5e7eb", 
  style = "solid",
  width = "100%",
  height = "auto",
  marginTop = "16px", 
  marginBottom = "16px",
  marginLeft = "0",
  marginRight = "0"
}) {
  return (
    <div
      style={{
        width: orientation === "horizontal" ? width : thickness,
        height: orientation === "horizontal" ? thickness : height,
        backgroundColor: color,
        borderStyle: style,
        borderWidth: orientation === "horizontal" ? "0" : thickness,
        borderTop: orientation === "horizontal" ? `${thickness} ${style} ${color}` : "none",
        borderLeft: orientation === "vertical" ? `${thickness} ${style} ${color}` : "none",
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        flexShrink: 0
      }}
    />
  );
}
