export const json_config = {
  type: "Testimonial",
  label: "Testimonial",
  category: "Advanced",
  description: "Testimonial card",
  icon: "fa-solid fa-comments",
  acceptsChildren: false,
  props: {
    quote: {
      type: "textarea",
      label: "Quote",
      default: "This is an amazing product! It changed my life completely."
    },
    author: {
      type: "string",
      label: "Author Name",
      default: "John Doe"
    },
    role: {
      type: "string",
      label: "Author Role",
      default: "CEO, Company"
    },
    avatar: {
      type: "string",
      label: "Avatar URL",
      default: "https://placehold.co/100x100"
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
    }
  }
};

export default function Testimonial({ quote = "This is an amazing product! It changed my life completely.", author = "John Doe", role = "CEO, Company", avatar = "https://placehold.co/100x100", padding = "24", backgroundColor = "#ffffff", borderRadius = "8" }) {
  return (
    <div style={{ padding: `${padding}px`, backgroundColor, borderRadius: `${borderRadius}px`, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
      <p style={{ color: "#4b5563", fontStyle: "italic", marginBottom: "16px" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img src={avatar} alt={author} style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
        <div>
          <div style={{ fontWeight: "600", color: "#111827" }}>{author}</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
