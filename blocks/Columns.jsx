export const json_config = {
  type: "Columns",
  label: "Columns",
  category: "Layout",
  description: "Grid columns layout",
  icon: "fa-solid fa-table-columns",
  acceptsChildren: true,
  props: {
    columns: {
      type: "select",
      label: "Columns",
      default: "2",
      options: ["1", "2", "3", "4", "6"]
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "32",
      options: ["0", "16", "24", "32", "48"]
    }
  }
};

export default function Columns({ children, columns = "2", gap = "32" }) {
  const gridCols = {
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))"
  };
  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: gridCols[columns],
        gap: `${gap}px`
      }}
    >
      {children}
    </div>
  );
}
