export const json_config = {
  type: "Image",
  label: "Image",
  category: "Media",
  description: "Image with customizable size and styling",
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
      default: "Image description"
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
      default: "auto",
      options: ["auto", "100%", "200px", "300px", "400px", "500px", "600px", "100vh"]
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      default: "cover",
      options: ["fill", "contain", "cover", "none", "scale-down"]
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
    opacity: {
      type: "select",
      label: "Opacity",
      default: "1",
      options: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"]
    },
    filter: {
      type: "select",
      label: "Filter",
      default: "none",
      options: ["none", "grayscale(100%)", "sepia(100%)", "blur(2px)", "brightness(1.2)", "contrast(1.2)", "hue-rotate(90deg)"]
    }
  }
};

export default function Image({ 
  src = "https://placehold.co/600x400", 
  alt = "Image description", 
  width = "100%", 
  height = "auto", 
  objectFit = "cover", 
  borderRadius = "0", 
  boxShadow = "none", 
  marginTop = "0", 
  marginBottom = "16px",
  opacity = "1",
  filter = "none"
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      style={{
        width,
        height,
        objectFit,
        borderRadius,
        boxShadow: boxShadowMap[boxShadow],
        marginTop,
        marginBottom,
        opacity,
        filter,
        display: "block",
        maxWidth: "100%"
      }}
    />
  );
}
