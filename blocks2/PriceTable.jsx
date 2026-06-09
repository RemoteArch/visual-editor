export const json_config = {
  type: "PriceTable",
  label: "Price Table",
  category: "Elements",
  description: "Pricing table with multiple plans",
  icon: "fa-solid fa-table-cells",
  acceptsChildren: false,
  props: {
    plans: {
      type: "textarea",
      label: "Plans (title|price|period|features|buttonText|highlight)",
      default: "Basic|$9|month|Feature 1,Feature 2,Feature 3|Get Started|false\nPro|$29|month|Feature 1,Feature 2,Feature 3,Feature 4,Feature 5|Get Started|true\nEnterprise|$99|month|All Features,Priority Support,Custom Solutions|Contact Us|false"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    titleColor: {
      type: "color",
      label: "Title Color",
      default: "#111827"
    },
    priceColor: {
      type: "color",
      label: "Price Color",
      default: "#4f46e5"
    },
    periodColor: {
      type: "color",
      label: "Period Color",
      default: "#6b7280"
    },
    featureColor: {
      type: "color",
      label: "Feature Color",
      default: "#374151"
    },
    buttonColor: {
      type: "color",
      label: "Button Color",
      default: "#4f46e5"
    },
    buttonTextColor: {
      type: "color",
      label: "Button Text Color",
      default: "#ffffff"
    },
    buttonHoverColor: {
      type: "color",
      label: "Button Hover Color",
      default: "#4338ca"
    },
    highlightColor: {
      type: "color",
      label: "Highlight Color",
      default: "#fef3c7"
    },
    highlightBorderColor: {
      type: "color",
      label: "Highlight Border Color",
      default: "#f59e0b"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "32px",
      options: ["16px", "24px", "32px", "40px", "48px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "12px",
      options: ["0", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "md",
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

export default function PriceTable({ 
  plans = "Basic|$9|month|Feature 1,Feature 2,Feature 3|Get Started|false\nPro|$29|month|Feature 1,Feature 2,Feature 3,Feature 4,Feature 5|Get Started|true\nEnterprise|$99|month|All Features,Priority Support,Custom Solutions|Contact Us|false",
  backgroundColor = "#ffffff",
  titleColor = "#111827",
  priceColor = "#4f46e5",
  periodColor = "#6b7280",
  featureColor = "#374151",
  buttonColor = "#4f46e5",
  buttonTextColor = "#ffffff",
  buttonHoverColor = "#4338ca",
  highlightColor = "#fef3c7",
  highlightBorderColor = "#f59e0b",
  padding = "32px",
  borderRadius = "12px",
  boxShadow = "md",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const parsePlans = () => {
    return plans.split('\n').map(line => {
      const parts = line.split('|');
      if (parts.length >= 6) {
        return {
          title: parts[0],
          price: parts[1],
          period: parts[2],
          features: parts[3].split(','),
          buttonText: parts[4],
          highlight: parts[5] === "true"
        };
      }
      return null;
    }).filter(Boolean);
  };

  const planList = parsePlans();

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  return (
    <div style={{
      marginTop,
      marginBottom
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${planList.length}, 1fr)`,
        gap: "24px"
      }}>
        {planList.map((plan, index) => (
          <div
            key={index}
            style={{
              backgroundColor: plan.highlight ? highlightColor : backgroundColor,
              padding,
              borderRadius: `${borderRadius}px`,
              boxShadow: boxShadowMap[boxShadow],
              border: plan.highlight ? `2px solid ${highlightBorderColor}` : "none",
              textAlign: "center",
              position: "relative"
            }}
          >
            {plan.highlight && (
              <div style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: highlightBorderColor,
                color: "#ffffff",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                Popular
              </div>
            )}
            <h3 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: titleColor,
              margin: "0 0 16px 0"
            }}>
              {plan.title}
            </h3>
            <div style={{ marginBottom: "24px" }}>
              <span style={{
                fontSize: "48px",
                fontWeight: "700",
                color: priceColor
              }}>
                {plan.price}
              </span>
              <span style={{
                fontSize: "16px",
                color: periodColor,
                marginLeft: "4px"
              }}>
                /{plan.period}
              </span>
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px 0",
              textAlign: "left"
            }}>
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} style={{
                  color: featureColor,
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <button
              style={{
                width: "100%",
                backgroundColor: buttonColor,
                color: buttonTextColor,
                border: "none",
                borderRadius: `${borderRadius}px`,
                padding: "14px 24px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = buttonColor}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
