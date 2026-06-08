export const json_config = {
  type: "FlexContainer",
  label: "Flex Container",
  category: "Layout",
  description: "Flex container",
  acceptsChildren: true,
  props: {
    direction: {
      type: "select",
      label: "Direction",
      default: "row",
      options: ["row", "column", "row-reverse", "column-reverse"]
    },
    justify: {
      type: "select",
      label: "Justify",
      default: "start",
      options: ["start", "end", "center", "between", "around", "evenly"]
    },
    align: {
      type: "select",
      label: "Align",
      default: "start",
      options: ["start", "end", "center", "stretch", "baseline"]
    },
    wrap: {
      type: "select",
      label: "Wrap",
      default: "nowrap",
      options: ["nowrap", "wrap", "wrap-reverse"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "4",
      options: ["0", "2", "4", "6", "8", "12"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function FlexContainer({ children, direction = "row", justify = "start", align = "start", wrap = "nowrap", gap = "4", className = "" }) {
  return (
    <div className={`flex flex-${direction} justify-${justify} items-${align} flex-${wrap} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}
