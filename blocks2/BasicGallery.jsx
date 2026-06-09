export const json_config = {
  type: "BasicGallery",
  label: "Basic Gallery",
  category: "Media",
  description: "Image gallery with customizable layout and styling",
  icon: "fa-solid fa-images",
  acceptsChildren: false,
  props: {
    images: {
      type: "textarea",
      label: "Images (one URL per line)",
      default: "https://placehold.co/600x400\nhttps://placehold.co/600x401\nhttps://placehold.co/600x402\nhttps://placehold.co/600x403"
    },
    columns: {
      type: "select",
      label: "Columns",
      default: "3",
      options: ["1", "2", "3", "4", "5", "6"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "1rem", "2rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      default: "auto",
      options: ["auto", "1/1", "4/3", "16/9", "3/2"]
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      default: "cover",
      options: ["fill", "contain", "cover", "none", "scale-down"]
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

export default function BasicGallery({ 
  images = "https://placehold.co/600x400\nhttps://placehold.co/600x401\nhttps://placehold.co/600x402\nhttps://placehold.co/600x403",
  columns = "3",
  gap = "16px",
  borderRadius = "8px",
  boxShadow = "none",
  aspectRatio = "auto",
  objectFit = "cover",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const imageList = typeof images === "string" ? images.split("\n").filter(img => img.trim()) : images;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      marginTop,
      marginBottom
    }}>
      {imageList.map((src, index) => (
        <img
          key={index}
          src={src.trim()}
          alt={`Gallery image ${index + 1}`}
          style={{
            width: "100%",
            aspectRatio: aspectRatio === "auto" ? "auto" : aspectRatio,
            objectFit,
            borderRadius: `${borderRadius}px`,
            boxShadow: boxShadowMap[boxShadow],
            display: "block"
          }}
        />
      ))}
    </div>
  );
}
