import React from "react";

export const json_config = {
  type: "ReadMore",
  label: "Read More",
  category: "Elements",
  description: "Expandable text with read more functionality",
  icon: "fa-solid fa-ellipsis",
  acceptsChildren: false,
  props: {
    content: {
      type: "textarea",
      label: "Content",
      default: "This is a long text that can be expanded. Click read more to see the full content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    maxLength: {
      type: "select",
      label: "Preview Length",
      default: "100",
      options: ["50", "100", "150", "200", "250"]
    },
    readMoreText: {
      type: "string",
      label: "Read More Text",
      default: "Read More"
    },
    readLessText: {
      type: "string",
      label: "Read Less Text",
      default: "Read Less"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    linkColor: {
      type: "color",
      label: "Link Color",
      default: "#4f46e5"
    },
    hoverColor: {
      type: "color",
      label: "Hover Color",
      default: "#4338ca"
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem"]
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      default: "1.6",
      options: ["1.4", "1.5", "1.6", "1.7", "1.8", "2"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
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

export default function ReadMore({ 
  content = "This is a long text that can be expanded. Click read more to see the full content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  maxLength = "100",
  readMoreText = "Read More",
  readLessText = "Read Less",
  textColor = "#111827",
  linkColor = "#4f46e5",
  hoverColor = "#4338ca",
  fontSize = "16px",
  lineHeight = "1.6",
  backgroundColor = "transparent",
  padding = "16px",
  borderRadius = "8px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLen = parseInt(maxLength);

  const shouldTruncate = content.length > maxLen;
  const displayContent = isExpanded || !shouldTruncate ? content : content.slice(0, maxLen) + "...";

  return (
    <div style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      marginTop,
      marginBottom
    }}>
      <p style={{
        color: textColor,
        fontSize,
        lineHeight,
        margin: 0
      }}>
        {displayContent}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: "none",
            border: "none",
            color: linkColor,
            cursor: "pointer",
            fontSize,
            fontWeight: "600",
            padding: "4px 0",
            marginTop: "8px",
            textDecoration: "none"
          }}
          onMouseEnter={(e) => e.target.style.color = hoverColor}
          onMouseLeave={(e) => e.target.style.color = linkColor}
        >
          {isExpanded ? readLessText : readMoreText}
        </button>
      )}
    </div>
  );
}
