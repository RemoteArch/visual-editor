export const json_config = {
  type: "Grid",
  label: "Grid",
  category: "Layout",
  description: "CSS Grid container",
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

export default function Grid({ children, cols = "3", rows = "auto", gap = "4", className = "" }) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: cols,
        gridTemplateRows: rows
      }}
    >
      {children}
    </div>
  );
}
