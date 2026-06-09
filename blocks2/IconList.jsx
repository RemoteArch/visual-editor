export const json_config = {
  type: "IconList",
  label: "Icon List",
  category: "Elements",
  description: "List of icons with text and customizable styling",
  icon: "fa-solid fa-list-ul",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "List Items (one per line: iconClass|text|link)",
      default: "fa-solid fa-check|Feature 1|#\nfa-solid fa-check|Feature 2|#\nfa-solid fa-check|Feature 3|#"
    },
    iconColor: {
      type: "color",
      label: "Icon Color",
      default: "#4f46e5"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    iconSize: {
      type: "select",
      label: "Icon Size",
      default: "20px",
      options: ["16px", "18px", "20px", "24px", "28px", "32px"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "12px",
      options: ["8px", "12px", "16px", "20px", "24px"]
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px", "32px"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
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
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "left",
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

export default function IconList({ 
  items = "fa-solid fa-check|Feature 1|#\nfa-solid fa-check|Feature 2|#\nfa-solid fa-check|Feature 3|#",
  iconColor = "#4f46e5",
  textColor = "#111827",
  iconSize = "20px",
  fontSize = "16px",
  gap = "12px",
  padding = "16px",
  backgroundColor = "transparent",
  borderRadius = "8px",
  boxShadow = "none",
  textAlign = "left",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const itemList = typeof items === "string" 
    ? items.split("\n").map(line => {
        const parts = line.split("|");
        return { 
          iconClass: parts[0]?.trim() || "fa-solid fa-check", 
          text: parts[1]?.trim() || "", 
          link: parts[2]?.trim() || "#" 
        };
      }).filter(item => item.text)
    : items;

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <ul style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      {itemList.map((item, index) => (
        <li 
          key={index}
          style={{
            display: "flex",
            alignItems: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start",
            gap,
            padding: "8px 0",
            justifyContent: textAlign === "center" ? "center" : textAlign === "right" ? "flex-end" : "flex-start"
          }}
        >
          <i
            className={item.iconClass}
            style={{
              fontSize: iconSize,
              color: iconColor,
              flexShrink: 0
            }}
          />
          {item.link && item.link !== "#" ? (
            <a
              href={item.link}
              style={{
                color: textColor,
                fontSize,
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = iconColor}
              onMouseLeave={(e) => e.target.style.color = textColor}
            >
              {item.text}
            </a>
          ) : (
            <span style={{ color: textColor, fontSize }}>
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
