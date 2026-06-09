export const json_config = {
  type: "Audio",
  label: "Audio",
  category: "Media",
  description: "Audio player",
  icon: "fa-solid fa-volume-high",
  acceptsChildren: false,
  props: {
    src: {
      type: "string",
      label: "Audio URL",
      default: ""
    }
  }
};

export default function Audio({ src = "" }) {
  return (
    <audio controls style={{ width: "100%" }}>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
