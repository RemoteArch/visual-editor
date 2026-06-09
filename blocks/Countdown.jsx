

export const json_config = {
  type: "Countdown",
  label: "Countdown",
  category: "Advanced",
  description: "Countdown timer",
  icon: "fa-solid fa-clock",
  acceptsChildren: false,
  props: {
    date: {
      type: "string",
      label: "Target Date (YYYY-MM-DD)",
      default: "2024-12-31"
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["8", "16", "24", "32"]
    },
    numberColor: {
      type: "color",
      label: "Number Color",
      default: "#4f46e5"
    },
    labelColor: {
      type: "color",
      label: "Label Color",
      default: "#6b7280"
    }
  }
};

export default function Countdown({ date = "2024-12-31", gap = "16", numberColor = "#4f46e5", labelColor = "#6b7280" }) {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const target = new Date(date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div style={{ display: "flex", gap: `${gap}px` }}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "30px", fontWeight: "700", color: numberColor }}>{value}</div>
          <div style={{ fontSize: "14px", color: labelColor, textTransform: "capitalize" }}>{unit}</div>
        </div>
      ))}
    </div>
  );
}
