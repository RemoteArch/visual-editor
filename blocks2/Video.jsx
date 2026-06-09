export const json_config = {
  type: "Video",
  label: "Video",
  category: "Media",
  description: "Video embed with customizable size and controls",
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
      options: ["youtube", "vimeo", "mp4", "embed"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "100%",
      options: ["auto", "100%", "50%", "25%", "200px", "300px", "400px", "500px", "600px", "800px", "1000px", "100vw"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "400px",
      options: ["auto", "100%", "200px", "300px", "400px", "500px", "600px", "100vh"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
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
    },
    autoplay: {
      type: "boolean",
      label: "Autoplay",
      default: false
    },
    muted: {
      type: "boolean",
      label: "Muted",
      default: false
    },
    controls: {
      type: "boolean",
      label: "Show Controls",
      default: true
    },
    loop: {
      type: "boolean",
      label: "Loop",
      default: false
    }
  }
};

export default function Video({ 
  src = "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  type = "youtube", 
  width = "100%", 
  height = "400px", 
  borderRadius = "0", 
  boxShadow = "none", 
  marginTop = "0", 
  marginBottom = "16px",
  autoplay = false,
  muted = false,
  controls = true,
  loop = false
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const getVideoEmbed = () => {
    if (type === "embed") {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: src }}
          style={{ width: "100%", height: "100%" }}
        />
      );
    }

    if (type === "mp4") {
      return (
        <video
          src={src}
          autoPlay={autoplay}
          muted={muted}
          controls={controls}
          loop={loop}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      );
    }

    // YouTube or Vimeo
    let embedUrl = src;
    if (type === "youtube" && !src.includes("embed")) {
      const videoId = src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId[1]}`;
      }
    } else if (type === "vimeo" && !src.includes("player.vimeo.com")) {
      const videoId = src.match(/vimeo\.com\/(\d+)/);
      if (videoId) {
        embedUrl = `https://player.vimeo.com/video/${videoId[1]}`;
      }
    }

    const queryParams = new URLSearchParams();
    if (autoplay) queryParams.append("autoplay", "1");
    if (muted) queryParams.append("muted", "1");
    if (loop) queryParams.append("loop", "1");
    if (controls) queryParams.append("controls", "1");

    return (
      <iframe
        src={`${embedUrl}${queryParams.toString() ? '?' + queryParams.toString() : ''}`}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div style={{
      width,
      height,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      overflow: "hidden",
      backgroundColor: "#000"
    }}>
      {getVideoEmbed()}
    </div>
  );
}
