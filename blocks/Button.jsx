export const json_config = {
  type: "Button",
  label: "Button",
  category: "Basic",
  description: "Call-to-action button",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Button Text",
      default: "Click Me"
    },
    href: {
      type: "string",
      label: "Link (href)",
      default: "#"
    },
    variant: {
      type: "select",
      label: "Style",
      default: "primary",
      options: ["primary", "secondary", "outline", "ghost"]
    },
    size: {
      type: "select",
      label: "Size",
      default: "medium",
      options: ["small", "medium", "large"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: ""
    }
  }
};

export default function Button({ text = "Click Me", href = "#", variant = "primary", size = "medium", className = "" }) {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50"
  };
  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  return (
    <a
      href={href}
      className={`inline-block font-medium rounded-lg transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {text}
    </a>
  );
}
