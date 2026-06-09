export const json_config = {
  type: "StarRating",
  label: "Star Rating",
  category: "Elements",
  description: "Star rating display with customizable rating and styling",
  icon: "fa-solid fa-star",
  acceptsChildren: false,
  props: {
    rating: {
      type: "select",
      label: "Rating",
      default: "5",
      options: ["0", "1", "2", "3", "4", "5"]
    },
    maxRating: {
      type: "select",
      label: "Max Rating",
      default: "5",
      options: ["5", "10"]
    },
    starSize: {
      type: "select",
      label: "Star Size",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px", "48px", "1rem", "1.5rem", "2rem"]
    },
    starColor: {
      type: "color",
      label: "Star Color",
      default: "#fbbf24"
    },
    emptyStarColor: {
      type: "color",
      label: "Empty Star Color",
      default: "#d1d5db"
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "4px",
      options: ["0", "2px", "4px", "8px", "12px", "16px"]
    },
    align: {
      type: "select",
      label: "Alignment",
      default: "left",
      options: ["left", "center", "right"]
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    }
  }
};

export default function StarRating({ 
  rating = "5", 
  maxRating = "5", 
  starSize = "24px", 
  starColor = "#fbbf24", 
  emptyStarColor = "#d1d5db",
  gap = "4px",
  align = "left",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const ratingValue = parseInt(rating);
  const maxRatingValue = parseInt(maxRating);

  return (
    <div style={{
      display: "flex",
      gap,
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      marginTop,
      marginBottom
    }}>
      {[...Array(maxRatingValue)].map((_, index) => (
        <span
          key={index}
          style={{
            fontSize: starSize,
            color: index < ratingValue ? starColor : emptyStarColor,
            cursor: "default"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
