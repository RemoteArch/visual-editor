export const json_config = {
  type: "Image",
  label: "Image",
  category: "Basic",
  description: "Image with optional caption",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full h-auto rounded-lg"
    }
  }
};

export default function Image({ src = "https://placehold.co/600x400", alt = "Image", caption = "", className = "w-full h-auto rounded-lg" }) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} className="w-full h-auto" />
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  );
}
