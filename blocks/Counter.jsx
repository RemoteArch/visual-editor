

export const json_config = {
  type: "Counter",
  label: "Counter",
  category: "Advanced",
  description: "Animated number counter",
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
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "text-4xl font-bold text-indigo-600"
    }
  }
};

export default function Counter({ number = 1000, prefix = "", suffix = "", duration = 2000, className = "text-4xl font-bold text-indigo-600" }) {
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
    <div className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}
