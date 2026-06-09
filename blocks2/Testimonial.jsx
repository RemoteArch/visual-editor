export const json_config = {
  type: "Testimonial",
  label: "Testimonial",
  category: "Elements",
  description: "Customer testimonial with quote and author info",
  icon: "fa-solid fa-quote-left",
  acceptsChildren: false,
  props: {
    quote: {
      type: "textarea",
      label: "Quote",
      default: "This is an amazing product! It has completely transformed the way I work."
    },
    author: {
      type: "string",
      label: "Author Name",
      default: "John Doe"
    },
    role: {
      type: "string",
      label: "Author Role",
      default: "CEO, Company"
    },
    avatar: {
      type: "string",
      label: "Avatar URL",
      default: "https://placehold.co/100x100"
    },
    showAvatar: {
      type: "boolean",
      label: "Show Avatar",
      default: true
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#f9fafb"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "32px",
      options: ["16px", "24px", "32px", "48px", "64px", "1rem", "2rem", "3rem"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "12px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "md",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    quoteColor: {
      type: "color",
      label: "Quote Color",
      default: "#374151"
    },
    authorColor: {
      type: "color",
      label: "Author Color",
      default: "#111827"
    },
    roleColor: {
      type: "color",
      label: "Role Color",
      default: "#6b7280"
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "center",
      options: ["left", "center", "right"]
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

export default function Testimonial({ 
  quote = "This is an amazing product! It has completely transformed the way I work.",
  author = "John Doe",
  role = "CEO, Company",
  avatar = "https://placehold.co/100x100",
  showAvatar = true,
  backgroundColor = "#f9fafb",
  padding = "32px",
  borderRadius = "12px",
  boxShadow = "md",
  quoteColor = "#374151",
  authorColor = "#111827",
  roleColor = "#6b7280",
  textAlign = "center",
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

  return (
    <div style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      textAlign
    }}>
      <div style={{
        fontSize: "24px",
        color: quoteColor,
        marginBottom: "16px",
        fontStyle: "italic"
      }}>
        "{quote}"
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
        gap: "8px"
      }}>
        {showAvatar && (
          <img
            src={avatar}
            alt={author}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        )}
        <div>
          <div style={{
            fontSize: "18px",
            fontWeight: "600",
            color: authorColor
          }}>
            {author}
          </div>
          <div style={{
            fontSize: "14px",
            color: roleColor
          }}>
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
