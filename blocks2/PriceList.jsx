export const json_config = {
  type: "PriceList",
  label: "Price List",
  category: "Elements",
  description: "Simple price list with items and prices",
  icon: "fa-solid fa-list",
  acceptsChildren: false,
  props: {
    items: {
      type: "textarea",
      label: "Items (name|price|description)",
      default: "Web Design|$500|Professional website design\nLogo Design|$200|Custom logo creation\nSEO Optimization|$300|Search engine optimization"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    nameColor: {
      type: "color",
      label: "Name Color",
      default: "#111827"
    },
    priceColor: {
      type: "color",
      label: "Price Color",
      default: "#4f46e5"
    },
    descriptionColor: {
      type: "color",
      label: "Description Color",
      default: "#6b7280"
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#e5e7eb"
    },
    nameFontSize: {
      type: "select",
      label: "Name Font Size",
      default: "18px",
      options: ["14px", "16px", "18px", "20px", "24px"]
    },
    priceFontSize: {
      type: "select",
      label: "Price Font Size",
      default: "20px",
      options: ["16px", "18px", "20px", "24px", "28px"]
    },
    descriptionFontSize: {
      type: "select",
      label: "Description Font Size",
      default: "14px",
      options: ["12px", "14px", "16px", "18px"]
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px"]
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

export default function PriceList({ 
  items = "Web Design|$500|Professional website design\nLogo Design|$200|Custom logo creation\nSEO Optimization|$300|Search engine optimization",
  backgroundColor = "#ffffff",
  nameColor = "#111827",
  priceColor = "#4f46e5",
  descriptionColor = "#6b7280",
  borderColor = "#e5e7eb",
  nameFontSize = "18px",
  priceFontSize = "20px",
  descriptionFontSize = "14px",
  padding = "24px",
  borderRadius = "8px",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const parseItems = () => {
    return items.split('\n').map(line => {
      const parts = line.split('|');
      if (parts.length >= 3) {
        return {
          name: parts[0],
          price: parts[1],
          description: parts[2]
        };
      }
      return null;
    }).filter(Boolean);
  };

  const itemList = parseItems();

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
      marginBottom
    }}>
      {itemList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "16px 0",
            borderBottom: index < itemList.length - 1 ? `1px solid ${borderColor}` : "none"
          }}
        >
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: nameFontSize,
              fontWeight: "600",
              color: nameColor,
              margin: "0 0 4px 0"
            }}>
              {item.name}
            </h3>
            <p style={{
              fontSize: descriptionFontSize,
              color: descriptionColor,
              margin: 0
            }}>
              {item.description}
            </p>
          </div>
          <div style={{
            fontSize: priceFontSize,
            fontWeight: "700",
            color: priceColor,
            marginLeft: "16px",
            whiteSpace: "nowrap"
          }}>
            {item.price}
          </div>
        </div>
      ))}
    </div>
  );
}
