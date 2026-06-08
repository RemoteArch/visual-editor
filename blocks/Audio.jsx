export const json_config = {
  type: "Audio",
  label: "Audio",
  category: "Media",
  description: "Audio player",
  acceptsChildren: false,
  props: {
    src: {
      type: "string",
      label: "Audio URL",
      default: ""
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full"
    }
  }
};

export default function Audio({ src = "", className = "w-full" }) {
  return (
    <audio controls className={className}>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
