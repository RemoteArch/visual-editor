export const json_config = {
  type: "Image",
  label: "Image",
  category: "Basic",
  description: "Image with optional caption",
  icon: "fa-solid fa-image",
  acceptsChildren: false,
  props: {
    src: {
      type: "string",
      label: "Source URL",
      default: "https://placehold.co/600x400"
    },
    alt: {
      type: "string",
      label: "Alt Text",
      default: "Image"
    },
    caption: {
      type: "string",
      label: "Caption",
      default: ""
    },
    width: {
      type: "select",
      label: "Width",
      default: "100",
      options: ["50", "75", "100"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    }
  }
};

export default function Image({ src = "https://placehold.co/600x400", alt = "Image", caption = "", width = "100", borderRadius = "8" }) {
  return (
    <figure style={{ width: `${width}%`, margin: "0" }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "auto", borderRadius: `${borderRadius}px` }} />
      {caption && <figcaption style={{ textAlign: "center", fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>{caption}</figcaption>}
    </figure>
  );
}
