export const json_config = {
  type: "PriceTable",
  label: "Price Table",
  category: "Advanced",
  description: "Pricing table",
  icon: "fa-solid fa-tag",
  acceptsChildren: false,
  props: {
    title: {
      type: "string",
      label: "Title",
      default: "Pro Plan"
    },
    price: {
      type: "string",
      label: "Price",
      default: "29"
    },
    period: {
      type: "string",
      label: "Period",
      default: "month"
    },
    currency: {
      type: "string",
      label: "Currency",
      default: "$"
    },
    features: {
      type: "textarea",
      label: "Features (one per line)",
      default: "Feature 1\nFeature 2\nFeature 3"
    },
    buttonText: {
      type: "string",
      label: "Button Text",
      default: "Get Started"
    },
    buttonHref: {
      type: "string",
      label: "Button Link",
      default: "#"
    },
    featured: {
      type: "boolean",
      label: "Featured",
      default: false
    },
    padding: {
      type: "select",
      label: "Padding (px)",
      default: "24",
      options: ["16", "24", "32"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8",
      options: ["0", "4", "8", "12", "16"]
    },
    featuredColor: {
      type: "color",
      label: "Featured Border Color",
      default: "#4f46e5"
    }
  }
};

export default function PriceTable({ title = "Pro Plan", price = "29", period = "month", currency = "$", features = "Feature 1\nFeature 2\nFeature 3", buttonText = "Get Started", buttonHref = "#", featured = false, padding = "24", backgroundColor = "#ffffff", borderRadius = "8", featuredColor = "#4f46e5" }) {
  const featureList = typeof features === "string" ? features.split("\n").filter(f => f.trim()) : features;
  return (
    <div style={{ 
      padding: `${padding}px`, 
      backgroundColor, 
      borderRadius: `${borderRadius}px`, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: featured ? `2px solid ${featuredColor}` : "none",
      transform: featured ? "scale(1.05)" : "none"
    }}>
      <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>{title}</h3>
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "36px", fontWeight: "700" }}>{currency}{price}</span>
        <span style={{ color: "#6b7280" }}>/ {period}</span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
        {featureList.map((feature, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4b5563", marginBottom: "8px" }}>
            <span style={{ color: "#22c55e" }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={buttonHref}
        style={{
          display: "block",
          textAlign: "center",
          padding: "12px 24px",
          borderRadius: `${borderRadius}px`,
          fontWeight: "500",
          textDecoration: "none",
          backgroundColor: featured ? featuredColor : "#f3f4f6",
          color: featured ? "#ffffff" : "#111827"
        }}
      >
        {buttonText}
      </a>
    </div>
  );
}
