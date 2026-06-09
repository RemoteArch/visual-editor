export const json_config = {
  type: "Grid",
  label: "Grid",
  category: "Layout",
  description: "CSS Grid container for responsive layouts",
  icon: "fa-solid fa-table-cells",
  acceptsChildren: true,
  props: {
    columns: {
      type: "select",
      label: "Columns",
      default: "3",
      options: ["1", "2", "3", "4", "5", "6"]
    },
    rows: {
      type: "select",
      label: "Rows",
      default: "auto",
      options: ["auto", "1fr", "minmax(0, 1fr)", "repeat(auto-fit, minmax(250px, 1fr))"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "0",
      options: ["0", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "50%"]
    },
    alignItems: {
      type: "select",
      label: "Align Items",
      default: "stretch",
      options: ["start", "end", "center", "stretch"]
    },
    justifyItems: {
      type: "select",
      label: "Justify Items",
      default: "stretch",
      options: ["start", "end", "center", "stretch"]
    }
  }
};

export default function Grid({ children, columns = "3", rows = "auto", gap = "16px", padding = "0", backgroundColor = "transparent", borderRadius = "0", alignItems = "stretch", justifyItems = "stretch" }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: rows,
      gap,
      padding,
      backgroundColor,
      borderRadius,
      alignItems,
      justifyItems
    }}>
      {children}
    </div>
  );
}
