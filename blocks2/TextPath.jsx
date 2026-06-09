export const json_config = {
  type: "TextPath",
  label: "Text Path",
  category: "Elements",
  description: "Text following a curved path",
  icon: "fa-solid fa-bezier-curve",
  acceptsChildren: false,
  props: {
    text: {
      type: "string",
      label: "Text",
      default: "Text on a Path"
    },
    pathType: {
      type: "select",
      label: "Path Type",
      default: "curve",
      options: ["curve", "circle", "wave"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px", "48px"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "600",
      options: ["400", "500", "600", "700", "800"]
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    strokeWidth: {
      type: "select",
      label: "Stroke Width",
      default: "0",
      options: ["0", "1", "2", "3"]
    },
    strokeColor: {
      type: "color",
      label: "Stroke Color",
      default: "#111827"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "32px",
      options: ["16px", "24px", "32px", "40px", "48px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
      options: ["0", "4px", "8px", "12px", "16px", "24px", "50%"]
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

export default function TextPath({ 
  text = "Text on a Path",
  pathType = "curve",
  fontSize = "24px",
  fontWeight = "600",
  textColor = "#111827",
  strokeWidth = "0",
  strokeColor = "#111827",
  backgroundColor = "transparent",
  padding = "32px",
  borderRadius = "8px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const getPathD = () => {
    switch (pathType) {
      case "circle":
        return "M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0";
      case "wave":
        return "M 0,100 Q 50,50 100,100 T 200,100 T 300,100 T 400,100";
      case "curve":
      default:
        return "M 10,100 Q 150,10 290,100";
    }
  };

  const getViewBox = () => {
    switch (pathType) {
      case "circle":
        return "0 0 200 200";
      case "wave":
        return "0 0 400 150";
      case "curve":
      default:
        return "0 0 300 150";
    }
  };

  return (
    <div style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      marginTop,
      marginBottom,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <svg
        viewBox={getViewBox()}
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto"
        }}
      >
        <defs>
          <path
            id="textPath"
            d={getPathD()}
            fill="none"
          />
        </defs>
        <text
          style={{
            fontSize,
            fontWeight,
            fill: textColor,
            stroke: strokeWidth !== "0" ? strokeColor : "none",
            strokeWidth: strokeWidth !== "0" ? strokeWidth : "0"
          }}
        >
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
