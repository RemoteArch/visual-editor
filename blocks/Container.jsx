export const json_config = {
  type: "Container",
  label: "Container",
  category: "Layout",
  description: "Centered container with max-width",
  icon: "fa-solid fa-box-open",
  acceptsChildren: true,
  props: {
    maxWidth: {
      type: "select",
      label: "Max Width",
      default: "72",
      options: ["48", "64", "72", "80", "96", "128"]
    },
    paddingX: {
      type: "select",
      label: "Padding X",
      default: "24",
      options: ["0", "12", "16", "24", "32", "48"]
    },
    paddingY: {
      type: "select",
      label: "Padding Y",
      default: "64",
      options: ["0", "16", "32", "48", "64", "80"]
    }
  }
};

export default function Container({ children, maxWidth = "72", paddingX = "24", paddingY = "64" }) {
  return (
    <div style={{ maxWidth: `${maxWidth}rem`, margin: "0 auto", padding: `${paddingY}px ${paddingX}px` }}>
      {children}
    </div>
  );
}
