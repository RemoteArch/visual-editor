export const json_config = {
  type: "Grid",
  label: "Grid",
  category: "Layout",
  description: "CSS Grid container",
  icon: "fa-solid fa-table-cells",
  acceptsChildren: true,
  props: {
    cols: {
      type: "string",
      label: "Columns (grid-template-columns)",
      default: "3"
    },
    rows: {
      type: "string",
      label: "Rows (grid-template-rows)",
      default: "auto"
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["0", "8", "16", "24", "32"]
    }
  }
};

export default function Grid({ children, cols = "3", rows = "auto", gap = "16" }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
        gap: `${gap}px`
      }}
    >
      {children}
    </div>
  );
}
