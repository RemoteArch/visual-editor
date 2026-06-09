export const json_config = {
  type: "Video",
  label: "Video",
  category: "Media",
  description: "Video embed",
  icon: "fa-solid fa-video",
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
    }
  }
};

export default function Video({ src = "https://www.youtube.com/embed/dQw4w9WgXcQ", type = "youtube", aspectRatio = "16/9" }) {
  const aspectRatios = {
    "16/9": { width: "100%", paddingBottom: "56.25%" },
    "4/3": { width: "100%", paddingBottom: "75%" },
    "1/1": { width: "100%", paddingBottom: "100%" },
    "9/16": { width: "100%", paddingBottom: "177.78%" }
  };
  const ratio = aspectRatios[aspectRatio];
  if (type === "mp4") {
    return (
      <video style={{ width: "100%", aspectRatio: aspectRatio.replace("/", "/") }} controls>
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  if (type === "custom") {
    return <div style={{ width: "100%", aspectRatio: aspectRatio.replace("/", "/") }} dangerouslySetInnerHTML={{ __html: src }} />;
  }
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: ratio.paddingBottom, height: 0 }}>
      <iframe
        src={src}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        allowFullScreen
        title="Video"
      />
    </div>
  );
}
