export const json_config = {
  type: "Pagination",
  label: "Pagination",
  category: "Widgets",
  description: "Pagination controls",
  icon: "fa-solid fa-angles-left-right",
  acceptsChildren: false,
  props: {
    currentPage: {
      type: "number",
      label: "Current Page",
      default: 1
    },
    totalPages: {
      type: "number",
      label: "Total Pages",
      default: 10
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    },
    activeColor: {
      type: "color",
      label: "Active Color",
      default: "#4f46e5"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "4",
      options: ["0", "4", "8"]
    }
  }
};

export default function Pagination({ currentPage = 1, totalPages = 10, gap = "8", activeColor = "#4f46e5", borderRadius = "4" }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div style={{ display: "flex", gap: `${gap}px` }}>
      <button 
        style={{ padding: "4px 12px", borderRadius: `${borderRadius}px`, cursor: "pointer", border: "1px solid #e5e7eb", background: "white" }}
        disabled={currentPage === 1}
      >◀</button>
      {pages.map((page, index) => (
        <button
          key={index}
          style={{
            padding: "4px 12px",
            borderRadius: `${borderRadius}px`,
            cursor: page === "..." ? "default" : "pointer",
            backgroundColor: page === currentPage ? activeColor : "white",
            color: page === currentPage ? "white" : "#111827",
            border: "1px solid #e5e7eb"
          }}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button 
        style={{ padding: "4px 12px", borderRadius: `${borderRadius}px`, cursor: "pointer", border: "1px solid #e5e7eb", background: "white" }}
        disabled={currentPage === totalPages}
      >▶</button>
    </div>
  );
}
