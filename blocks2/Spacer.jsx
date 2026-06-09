export const json_config = {
  type: "Spacer",
  label: "Spacer",
  category: "Layout",
  description: "Empty space with customizable height",
  icon: "fa-solid fa-arrows-up-down",
  acceptsChildren: false,
  props: {
    height: {
      type: "select",
      label: "Height",
      default: "32px",
      options: ["8px", "16px", "24px", "32px", "48px", "64px", "96px", "128px", "1rem", "2rem", "3rem", "4rem", "5vh", "10vh", "20vh", "50vh", "100vh"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "100%",
      options: ["100%", "50%", "25%", "auto", "10px", "20px", "50px", "100px"]
    }
  }
};

export default function Spacer({ height = "32px", width = "100%" }) {
  return (
    <div style={{
      height,
      width,
      flexShrink: 0
    }} />
  );
}
