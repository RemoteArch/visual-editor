

export const json_config = {
  type: "Countdown",
  label: "Countdown",
  category: "Advanced",
  description: "Countdown timer",
  acceptsChildren: false,
  props: {
    date: {
      type: "string",
      label: "Target Date (YYYY-MM-DD)",
      default: "2024-12-31"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "flex gap-4"
    }
  }
};

export default function Countdown({ date = "2024-12-31", className = "flex gap-4" }) {
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
    <div className={className}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl font-bold text-indigo-600">{value}</div>
          <div className="text-sm text-gray-500 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  );
}
