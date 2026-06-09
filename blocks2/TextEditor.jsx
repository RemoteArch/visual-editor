export const json_config = {
  type: "TextEditor",
  label: "Text Editor",
  category: "Typography",
  description: "Rich text content with customizable styling",
  icon: "fa-solid fa-align-left",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "Write your content here. This is a text editor block that supports paragraphs, lists, and more."
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "24px", "1rem", "1.25rem", "1.5rem"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "400",
      options: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#374151"
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "left",
      options: ["left", "center", "right", "justify"]
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      default: "1.6",
      options: ["1", "1.2", "1.4", "1.6", "1.8", "2"]
    },
    letterSpacing: {
      type: "select",
      label: "Letter Spacing",
      default: "normal",
      options: ["normal", "-0.5px", "0", "0.5px", "1px", "2px"]
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
    padding: {
      type: "select",
      label: "Padding",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "1rem", "2rem"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "50%"]
    }
  }
};

export default function TextEditor({ 
  content = "Write your content here. This is a text editor block that supports paragraphs, lists, and more.", 
  fontSize = "16px", 
  fontWeight = "400", 
  color = "#374151", 
  textAlign = "left", 
  lineHeight = "1.6", 
  letterSpacing = "normal", 
  marginTop = "0", 
  marginBottom = "16px",
  padding = "0",
  backgroundColor = "transparent",
  borderRadius = "0"
}) {
  // Convert newlines to paragraphs for display
  const paragraphs = content.split('\n').filter(p => p.trim());
  
  return (
    <div style={{
      fontSize,
      fontWeight,
      color,
      textAlign,
      lineHeight,
      letterSpacing,
      marginTop,
      marginBottom,
      padding,
      backgroundColor,
      borderRadius
    }}>
      {paragraphs.length > 0 ? (
        paragraphs.map((paragraph, index) => (
          <p key={index} style={{ marginBottom: index < paragraphs.length - 1 ? '1em' : '0' }}>
            {paragraph}
          </p>
        ))
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}
