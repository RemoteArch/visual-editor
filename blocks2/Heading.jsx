export const json_config = {
  type: "Heading",
  label: "Heading",
  category: "Typography",
  description: "Heading text with customizable level and styling",
  icon: "fa-solid fa-heading",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Text",
      default: "Your Heading Here"
    },
    level: {
      type: "select",
      label: "Level",
      default: "h2",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "32px",
      options: ["16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px", "48px", "56px", "64px", "1rem", "1.5rem", "2rem", "2.5rem", "3rem", "4rem", "5rem"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "700",
      options: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#111827"
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
      default: "1.2",
      options: ["1", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.8", "2"]
    },
    letterSpacing: {
      type: "select",
      label: "Letter Spacing",
      default: "normal",
      options: ["normal", "-0.5px", "-0.25px", "0", "0.25px", "0.5px", "1px", "2px", "4px"]
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "64px", "1rem", "2rem"]
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "64px", "1rem", "2rem"]
    }
  }
};

export default function Heading({ 
  text = "Your Heading Here", 
  level = "h2", 
  fontSize = "32px", 
  fontWeight = "700", 
  color = "#111827", 
  textAlign = "left", 
  lineHeight = "1.2", 
  letterSpacing = "normal", 
  marginTop = "0", 
  marginBottom = "16px" 
}) {
  const HeadingTag = level;
  
  return (
    <HeadingTag style={{
      fontSize,
      fontWeight,
      color,
      textAlign,
      lineHeight,
      letterSpacing,
      marginTop,
      marginBottom
    }}>
      {text}
    </HeadingTag>
  );
}
