export const json_config = {
  type: "Map",
  label: "Map",
  category: "Media",
  description: "Google Maps embed",
  acceptsChildren: false,
  props: {
    address: {
      type: "string",
      label: "Address",
      default: "1600 Amphitheatre Parkway, Mountain View, CA"
    },
    zoom: {
      type: "select",
      label: "Zoom Level",
      default: "15",
      options: ["10", "12", "15", "17", "20"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "400",
      options: ["300", "400", "500", "600"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "w-full"
    }
  }
};

export default function Map({ address = "1600 Amphitheatre Parkway, Mountain View, CA", zoom = 15, height = "400", className = "w-full" }) {
  return (
    <div className={className} style={{ height: `${height}px` }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
        title="Map"
      />
    </div>
  );
}
