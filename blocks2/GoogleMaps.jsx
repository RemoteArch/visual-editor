export const json_config = {
  type: "GoogleMaps",
  label: "Google Maps",
  category: "Media",
  description: "Google Maps embed with customizable location and styling",
  icon: "fa-solid fa-map-location-dot",
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
      options: ["1", "5", "10", "15", "20"]
    },
    height: {
      type: "select",
      label: "Height",
      default: "400px",
      options: ["200px", "300px", "400px", "500px", "600px", "100vh"]
    },
    width: {
      type: "select",
      label: "Width",
      default: "100%",
      options: ["auto", "100%", "50%", "25%", "200px", "300px", "400px", "500px", "600px", "800px", "1000px", "100vw"]
    },
    mapType: {
      type: "select",
      label: "Map Type",
      default: "roadmap",
      options: ["roadmap", "satellite", "hybrid", "terrain"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
    },
    boxShadow: {
      type: "select",
      label: "Box Shadow",
      default: "none",
      options: ["none", "sm", "md", "lg", "xl"]
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      default: "0",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      default: "16px",
      options: ["0", "8px", "16px", "24px", "32px", "48px", "1rem", "2rem"]
    }
  }
};

export default function GoogleMaps({ 
  address = "1600 Amphitheatre Parkway, Mountain View, CA", 
  zoom = "15", 
  height = "400px",
  width = "100%",
  mapType = "roadmap",
  borderRadius = "0", 
  boxShadow = "none", 
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=${mapType}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={{
      width,
      height,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      overflow: "hidden",
      border: "none"
    }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        style={{ border: 0 }}
        title="Google Maps"
      />
    </div>
  );
}
