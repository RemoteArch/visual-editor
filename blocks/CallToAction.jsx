export const json_config = {
  type: "CallToAction",
  label: "Call To Action",
  category: "Basic",
  description: "Call to action section",
  icon: "fa-solid fa-bolt",
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
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#4f46e5"
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#ffffff"
    }
  }
};

export default function CallToAction({ title = "Get Started Today", description = "Join thousands of satisfied customers", buttonText = "Sign Up Now", buttonHref = "#", backgroundColor = "#4f46e5", textColor = "#ffffff" }) {
  return (
    <div style={{ padding: "32px", backgroundColor, borderRadius: "12px", textAlign: "center", color: textColor }}>
      <h2 style={{ fontSize: "30px", fontWeight: "700", marginBottom: "8px" }}>{title}</h2>
      <p style={{ fontSize: "18px", marginBottom: "24px", opacity: 0.9 }}>{description}</p>
      <a
        href={buttonHref}
        style={{
          display: "inline-block",
          padding: "12px 32px",
          backgroundColor: "#ffffff",
          color: "#4f46e5",
          fontWeight: "600",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        {buttonText}
      </a>
    </div>
  );
}
