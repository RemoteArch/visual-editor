export const json_config = {
  type: "MenuAnchor",
  label: "Menu Anchor",
  category: "Site",
  description: "Anchor link for menu navigation",
  icon: "fa-solid fa-anchor",
  acceptsChildren: false,
  props: {
    anchor: {
      type: "string",
      label: "Anchor ID",
      default: "section"
    },
    offset: {
      type: "select",
      label: "Offset",
      default: "0",
      options: ["0", "50", "100", "150", "200"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "0",
      options: ["0", "8px", "12px", "16px", "20px", "24px"]
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
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    }
  }
};

export default function MenuAnchor({ 
  anchor = "section",
  offset = "0",
  backgroundColor = "transparent",
  padding = "0",
  marginTop = "0", 
  marginBottom = "0"
}) {
  return (
    <div
      id={anchor}
      style={{
        backgroundColor,
        padding,
        marginTop,
        marginBottom,
        scrollMarginTop: `${offset}px`
      }}
    />
  );
}
