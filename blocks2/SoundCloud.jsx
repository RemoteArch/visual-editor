export const json_config = {
  type: "SoundCloud",
  label: "SoundCloud",
  category: "Media",
  description: "SoundCloud audio player embed",
  icon: "fa-brands fa-soundcloud",
  acceptsChildren: false,
  props: {
    trackUrl: {
      type: "string",
      label: "Track URL",
      default: ""
    },
    autoplay: {
      type: "boolean",
      label: "Autoplay",
      default: false
    },
    visual: {
      type: "boolean",
      label: "Visual Player",
      default: false
    },
    width: {
      type: "select",
      label: "Width",
      default: "100%",
      options: ["auto", "100%", "50%", "300px", "400px", "500px", "600px"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "166px",
      options: ["166px", "200px", "300px", "400px", "500px"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#f9fafb"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px", "32px"]
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

export default function SoundCloud({ 
  trackUrl = "",
  autoplay = false,
  visual = false,
  width = "100%",
  height = "166px",
  backgroundColor = "#f9fafb",
  padding = "16px",
  borderRadius = "8px",
  boxShadow = "none",
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

  const getEmbedUrl = () => {
    if (!trackUrl) return null;
    
    const visualParam = visual ? "&visual=true" : "";
    const autoplayParam = autoplay ? "&auto_play=true" : "";
    
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}${visualParam}${autoplayParam}`;
  };

  const embedUrl = getEmbedUrl();

  return (
    <div style={{
      width,
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          scrolling="no"
          frameBorder="no"
          style={{ border: "none" }}
        />
      ) : (
        <div style={{
          height: height || "166px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          textAlign: "center"
        }}>
          Please provide a SoundCloud track URL
        </div>
      )}
    </div>
  );
}
