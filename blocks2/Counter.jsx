
export const json_config = {
  type: "Counter",
  label: "Counter",
  category: "Elements",
  description: "Animated number counter with customizable styling",
  icon: "fa-solid fa-hashtag",
  acceptsChildren: false,
  props: {
    startingNumber: {
      type: "select",
      label: "Starting Number",
      default: "0",
      options: ["0", "1", "10", "100", "1000"]
    },
    endingNumber: {
      type: "select",
      label: "Ending Number",
      default: "1000",
      options: ["10", "100", "1000", "10000", "100000"]
    },
    duration: {
      type: "select",
      label: "Animation Duration (ms)",
      default: "2000",
      options: ["1000", "2000", "3000", "4000", "5000"]
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
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "48px",
      options: ["24px", "32px", "40px", "48px", "56px", "64px", "72px", "2rem", "3rem", "4rem", "5rem"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "700",
      options: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold"]
    },
    color: {
      type: "color",
      label: "Color",
      default: "#111827"
    },
    textAlign: {
      type: "select",
      label: "Text Align",
      default: "center",
      options: ["left", "center", "right"]
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

export default function Counter({ 
  startingNumber = "0",
  endingNumber = "1000",
  duration = "2000",
  prefix = "",
  suffix = "",
  fontSize = "48px",
  fontWeight = "700",
  color = "#111827",
  textAlign = "center",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [count, setCount] = React.useState(parseInt(startingNumber));
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const start = parseInt(startingNumber);
            const end = parseInt(endingNumber);
            const durationMs = parseInt(duration);
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / durationMs, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(start + (end - start) * easeOutQuart);
              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [startingNumber, endingNumber, duration, hasAnimated]);

  return (
    <div
      ref={counterRef}
      style={{
        fontSize,
        fontWeight,
        color,
        textAlign,
        marginTop,
        marginBottom
      }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}
