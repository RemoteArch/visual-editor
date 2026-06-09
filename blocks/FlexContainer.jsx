export const json_config = {
  type: "FlexContainer",
  label: "Flex Container",
  category: "Layout",
  description: "Flex container",
  icon: "fa-solid fa-grip-lines-vertical",
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
      label: "Gap (px)",
      default: "16",
      options: ["0", "8", "16", "24", "32"]
    }
  }
};

export default function FlexContainer({ children, direction = "row", justify = "start", align = "start", wrap = "nowrap", gap = "16" }) {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap: `${gap}px`
      }}
    >
      {children}
    </div>
  );
}
