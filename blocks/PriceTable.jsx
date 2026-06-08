export const json_config = {
  type: "PriceTable",
  label: "Price Table",
  category: "Advanced",
  description: "Pricing table",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "p-6 bg-white rounded-lg shadow-md"
    }
  }
};

export default function PriceTable({ title = "Pro Plan", price = "29", period = "month", currency = "$", features = "Feature 1\nFeature 2\nFeature 3", buttonText = "Get Started", buttonHref = "#", featured = false, className = "p-6 bg-white rounded-lg shadow-md" }) {
  const featureList = typeof features === "string" ? features.split("\n").filter(f => f.trim()) : features;
  return (
    <div className={`${className} ${featured ? "ring-2 ring-indigo-500 scale-105" : ""}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{currency}{price}</span>
        <span className="text-gray-500">/{period}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {featureList.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600">
            <span className="text-green-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={buttonHref}
        className={`block text-center px-6 py-3 rounded-lg font-medium transition-colors ${
          featured
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </a>
    </div>
  );
}
