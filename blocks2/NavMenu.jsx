import React from "react";

export const json_config = {
  type: "NavMenu",
  label: "Nav Menu",
  category: "Site",
  description: "Navigation menu with links",
  icon: "fa-solid fa-bars",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "Menu Items (text|url)",
      default: "Home|#\nAbout|#about\nServices|#services\nContact|#contact"
    },
    orientation: {
      type: "select",
      label: "Orientation",
      default: "horizontal",
      options: ["horizontal", "vertical"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    hoverColor: {
      type: "color",
      label: "Hover Color",
      default: "#4f46e5"
    },
    activeColor: {
      type: "color",
      label: "Active Color",
      default: "#4f46e5"
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "16px",
      options: ["12px", "14px", "16px", "18px", "20px", "1rem"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "500",
      options: ["400", "500", "600", "700"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "24px",
      options: ["16px", "24px", "32px", "40px"]
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px 24px",
      options: ["12px 16px", "16px 24px", "20px 32px", "24px 40px"]
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

export default function NavMenu({ 
  items = "Home|#\nAbout|#about\nServices|#services\nContact|#contact",
  orientation = "horizontal",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  hoverColor = "#4f46e5",
  activeColor = "#4f46e5",
  fontSize = "16px",
  fontWeight = "500",
  gap = "24px",
  padding = "16px 24px",
  borderRadius = "8px",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const parseItems = () => {
    return items.split('\n').map(line => {
      const parts = line.split('|');
      if (parts.length >= 2) {
        return {
          text: parts[0],
          url: parts[1]
        };
      }
      return null;
    }).filter(Boolean);
  };

  const menuItems = parseItems();

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const linkStyle = {
    color: textColor,
    textDecoration: "none",
    fontSize,
    fontWeight,
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "color 0.2s ease, background-color 0.2s ease",
    cursor: "pointer"
  };

  return (
    <nav style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      <ul style={{
        display: orientation === "horizontal" ? "flex" : "block",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        gap: orientation === "horizontal" ? gap : "12px",
        listStyle: "none",
        margin: 0,
        padding: 0
      }}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              style={{
                ...linkStyle,
                color: index === activeIndex ? activeColor : textColor,
                backgroundColor: index === activeIndex ? `${activeColor}15` : "transparent"
              }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={(e) => {
                if (index !== activeIndex) {
                  e.target.style.color = hoverColor;
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeIndex) {
                  e.target.style.color = textColor;
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
