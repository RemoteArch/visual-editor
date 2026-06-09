export const json_config = {
  type: "SocialIcons",
  label: "Social Icons",
  category: "Elements",
  description: "Social media icon links with customizable styling",
  icon: "fa-solid fa-share-nodes",
  acceptsChildren: false,
  props: {
    icons: {
      type: "textarea",
      label: "Icons (one per line: iconClass|url)",
      default: "fa-brands fa-facebook|https://facebook.com\nfa-brands fa-twitter|https://twitter.com\nfa-brands fa-instagram|https://instagram.com\nfa-brands fa-linkedin|https://linkedin.com"
    },
    size: {
      type: "select",
      label: "Icon Size",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px", "48px", "1rem", "1.5rem", "2rem"]
    },
    color: {
      type: "color",
      label: "Icon Color",
      default: "#6b7280"
    },
    hoverColor: {
      type: "color",
      label: "Hover Color",
      default: "#4f46e5"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "50%",
      options: ["0", "4px", "8px", "12px", "16px", "50%"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "16px",
      options: ["8px", "12px", "16px", "24px", "32px", "48px"]
    },
    align: {
      type: "select",
      label: "Alignment",
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

export default function SocialIcons({ 
  icons = "fa-brands fa-facebook|https://facebook.com\nfa-brands fa-twitter|https://twitter.com\nfa-brands fa-instagram|https://instagram.com\nfa-brands fa-linkedin|https://linkedin.com",
  size = "24px",
  color = "#6b7280",
  hoverColor = "#4f46e5",
  backgroundColor = "transparent",
  padding = "8px",
  borderRadius = "50%",
  gap = "16px",
  align = "center",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const iconList = typeof icons === "string" 
    ? icons.split("\n").map(item => {
        const [iconClass, url] = item.split("|");
        return { iconClass: iconClass?.trim(), url: url?.trim() || "#" };
      }).filter(item => item.iconClass)
    : icons;

  return (
    <div style={{
      display: "flex",
      gap,
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      marginTop,
      marginBottom
    }}>
      {iconList.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `calc(${size} + ${padding} * 2)`,
            height: `calc(${size} + ${padding} * 2)`,
            backgroundColor,
            padding,
            borderRadius: `${borderRadius}px`,
            textDecoration: "none",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = hoverColor;
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = color;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i
            className={item.iconClass}
            style={{
              fontSize: size,
              color,
              transition: "color 0.2s ease"
            }}
          />
        </a>
      ))}
    </div>
  );
}
