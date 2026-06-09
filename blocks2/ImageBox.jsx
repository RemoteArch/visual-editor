export const json_config = {
  type: "ImageBox",
  label: "Image Box",
  category: "Elements",
  description: "Image with overlay content and customizable styling",
  icon: "fa-solid fa-image",
  acceptsChildren: false,
  props: {
    src: {
      type: "string",
      label: "Image URL",
      default: "https://placehold.co/600x400"
    },
    alt: {
      type: "string",
      label: "Alt Text",
      default: "Image description"
    },
    title: {
      type: "string",
      label: "Title",
      default: "Image Title"
    },
    description: {
      type: "textarea",
      label: "Description",
      default: "Add a description for this image"
    },
    overlay: {
      type: "boolean",
      label: "Show Overlay",
      default: true
    },
    overlayColor: {
      type: "color",
      label: "Overlay Color",
      default: "rgba(0, 0, 0, 0.5)"
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
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "center",
      options: ["left", "center", "right"]
    }
  }
};

export default function ImageBox({ 
  src = "https://placehold.co/600x400", 
  alt = "Image description",
  title = "Image Title",
  description = "Add a description for this image",
  overlay = true,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  width = "100%", 
  height = "400px", 
  objectFit = "cover", 
  borderRadius = "0", 
  boxShadow = "none", 
  marginTop = "0", 
  marginBottom = "16px",
  textAlign = "center"
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <div style={{
      position: "relative",
      width,
      height,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      overflow: "hidden"
    }}>
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          display: "block"
        }}
      />
      {overlay && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
          padding: "24px",
          textAlign
        }}>
          {title && (
            <h3 style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "8px"
            }}>
              {title}
            </h3>
          )}
          {description && (
            <p style={{
              color: "#ffffff",
              fontSize: "16px",
              margin: 0
            }}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
