export const json_config = {
  type: "Video",
  label: "Video",
  category: "Media",
  description: "Video embed",
  acceptsChildren: false,
  props: {
    src: {
      type: "string",
      label: "Video URL or Embed Code",
      default: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    type: {
      type: "select",
      label: "Type",
      default: "youtube",
      options: ["youtube", "vimeo", "mp4", "custom"]
    },
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      default: "16/9",
      options: ["16/9", "4/3", "1/1", "9/16"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full"
    }
  }
};

export default function Video({ src = "https://www.youtube.com/embed/dQw4w9WgXcQ", type = "youtube", aspectRatio = "16/9", className = "w-full" }) {
  const aspectStyles = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "9/16": "aspect-[9/16]"
  };
  if (type === "mp4") {
    return (
      <video className={`${aspectStyles[aspectRatio]} ${className}`} controls>
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  if (type === "custom") {
    return <div className={`${aspectStyles[aspectRatio]} ${className}`} dangerouslySetInnerHTML={{ __html: src }} />;
  }
  return (
    <div className={`${aspectStyles[aspectRatio]} ${className}`}>
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        title="Video"
      />
    </div>
  );
}
