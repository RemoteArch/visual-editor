export const json_config = {
  type: "CallToAction",
  label: "Call To Action",
  category: "Basic",
  description: "Call to action section",
  acceptsChildren: false,
  props: {
    title: {
      type: "string",
      label: "Title",
      default: "Get Started Today"
    },
    description: {
      type: "textarea",
      label: "Description",
      default: "Join thousands of satisfied customers"
    },
    buttonText: {
      type: "string",
      label: "Button Text",
      default: "Sign Up Now"
    },
    buttonHref: {
      type: "string",
      label: "Button Link",
      default: "#"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-center"
    }
  }
};

export default function CallToAction({ title = "Get Started Today", description = "Join thousands of satisfied customers", buttonText = "Sign Up Now", buttonHref = "#", className = "p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-center" }) {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-lg mb-6 opacity-90">{description}</p>
      <a
        href={buttonHref}
        className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
}
