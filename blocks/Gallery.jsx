export const json_config = {
  type: "Gallery",
  label: "Gallery",
  category: "Media",
  description: "Image gallery",
  icon: "fa-solid fa-images",
  acceptsChildren: false,
  props: {
    images: {
      type: "textarea",
      label: "Image URLs (one per line)",
      default: "https://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300"
    },
    columns: {
      type: "select",
      label: "Columns",
      default: "2",
      options: ["1", "2", "3", "4"]
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["0", "8", "16", "24", "32"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    }
  }
};

export default function Gallery({ images = "https://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300", columns = 2, gap = "16", borderRadius = "8" }) {
  const imageList = typeof images === "string" ? images.split("\n").filter(i => i.trim()) : images;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gap}px` }}>
      {imageList.map((img, index) => (
        <img key={index} src={img} alt={`Gallery ${index + 1}`} style={{ width: "100%", height: "auto", borderRadius: `${borderRadius}px` }} />
      ))}
    </div>
  );
}
