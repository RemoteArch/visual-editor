export const json_config = {
  type: "Pagination",
  label: "Pagination",
  category: "Widgets",
  description: "Pagination controls",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "flex gap-2"
    }
  }
};

export default function Pagination({ currentPage = 1, totalPages = 10, className = "flex gap-2" }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  
  return (
    <div className={className}>
      <button className="px-3 py-1 rounded hover:bg-gray-100" disabled={currentPage === 1}>◀</button>
      {pages.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${page === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button className="px-3 py-1 rounded hover:bg-gray-100" disabled={currentPage === totalPages}>▶</button>
    </div>
  );
}
