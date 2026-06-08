export const json_config = {
  type: "Gallery",
  label: "Gallery",
  category: "Media",
  description: "Image gallery",
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
      label: "Gap",
      default: "4",
      options: ["0", "2", "4", "6", "8"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Gallery({ images = "https://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300\nhttps://placehold.co/400x300", columns = 2, gap = 4, className = "" }) {
  const imageList = typeof images === "string" ? images.split("\n").filter(i => i.trim()) : images;
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };
  return (
    <div className={`grid ${gridCols[columns]} gap-${gap} ${className}`}>
      {imageList.map((img, index) => (
        <img key={index} src={img} alt={`Gallery ${index + 1}`} className="w-full h-auto rounded-lg" />
      ))}
    </div>
  );
}
