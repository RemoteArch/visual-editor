import React from "react";

export const json_config = {
  type: "AnimatedHeadline",
  label: "Animated Headline",
  category: "Elements",
  description: "Animated text headline with typing effect",
  icon: "fa-solid fa-heading",
  acceptsChildren: false,
  props: {
    prefixText: {
      type: "string",
      label: "Prefix Text",
      default: "We create"
    },
    animatedText: {
      type: "textarea",
      label: "Animated Words (one per line)",
      default: "amazing\nbeautiful\nstunning\nincredible"
    },
    suffixText: {
      type: "string",
      label: "Suffix Text",
      default: "websites"
    },
    animationType: {
      type: "select",
      label: "Animation Type",
      default: "typing",
      options: ["typing", "fade", "slide"]
    },
    typingSpeed: {
      type: "select",
      label: "Typing Speed (ms)",
      default: "100",
      options: ["50", "100", "150", "200"]
    },
    deleteSpeed: {
      type: "select",
      label: "Delete Speed (ms)",
      default: "50",
      options: ["30", "50", "75", "100"]
    },
    pauseDuration: {
      type: "select",
      label: "Pause Duration (ms)",
      default: "2000",
      options: ["1000", "1500", "2000", "2500", "3000"]
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      default: "48px",
      options: ["24px", "32px", "40px", "48px", "56px", "64px"]
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      default: "700",
      options: ["400", "500", "600", "700", "800"]
    },
    textColor: {
      type: "color",
      label: "Text Color",
      default: "#111827"
    },
    animatedColor: {
      type: "color",
      label: "Animated Text Color",
      default: "#4f46e5"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "transparent"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
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

export default function AnimatedHeadline({ 
  prefixText = "We create",
  animatedText = "amazing\nbeautiful\nstunning\nincredible",
  suffixText = "websites",
  animationType = "typing",
  typingSpeed = "100",
  deleteSpeed = "50",
  pauseDuration = "2000",
  fontSize = "48px",
  fontWeight = "700",
  textColor = "#111827",
  animatedColor = "#4f46e5",
  backgroundColor = "transparent",
  padding = "24px",
  borderRadius = "8px",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const words = animatedText.split('\n').filter(Boolean);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const typing = () => {
      if (!isDeleting && displayText.length < currentWord.length) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else if (!isDeleting && displayText.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), parseInt(pauseDuration));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const speed = isDeleting ? parseInt(deleteSpeed) : parseInt(typingSpeed);
    const timer = setTimeout(typing, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed, deleteSpeed, pauseDuration]);

  return (
    <div style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      marginTop,
      marginBottom
    }}>
      <h1 style={{
        fontSize,
        fontWeight,
        color: textColor,
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        gap: "8px"
      }}>
        {prefixText && <span>{prefixText} </span>}
        <span style={{ color: animatedColor }}>
          {displayText}
          <span style={{
            animation: "blink 1s step-end infinite",
            marginLeft: "2px"
          }}>|</span>
        </span>
        {suffixText && <span> {suffixText}</span>}
      </h1>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
