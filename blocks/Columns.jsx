export const json_config = {
  type: "Columns",
  label: "Columns",
  category: "Layout",
  description: "Grid columns layout",
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
      label: "Gap",
      default: "8",
      options: ["0", "4", "6", "8", "12"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Columns({ children, columns = "2", gap = "8", className = "" }) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };
  return (
    <div className={`grid ${gridCols[columns]} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}
