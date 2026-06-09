

export const json_config = {
  type: "Counter",
  label: "Counter",
  category: "Advanced",
  description: "Animated number counter",
  icon: "fa-solid fa-hashtag",
  acceptsChildren: false,
  props: {
    number: {
      type: "number",
      label: "Target Number",
      default: 1000
    },
    prefix: {
      type: "string",
      label: "Prefix",
      default: ""
    },
    suffix: {
      type: "string",
      label: "Suffix",
      default: ""
    },
    duration: {
      type: "select",
      label: "Duration (ms)",
      default: "2000",
      options: ["1000", "2000", "3000", "5000"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "36",
      options: ["24", "30", "36", "48", "60"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "700",
      options: ["400", "500", "600", "700", "800"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#4f46e5"
    }
  }
};

export default function Counter({ number = 1000, prefix = "", suffix = "", duration = 2000, fontSize = "36", fontWeight = "700", color = "#4f46e5" }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = number;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [number, duration]);

  return (
    <div style={{ fontSize: `${fontSize}px`, fontWeight, color }}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}
