import React from "react";

export const json_config = {
  type: "Slides",
  label: "Slides",
  category: "Media",
  description: "Full-screen slides presentation",
  icon: "fa-solid fa-images",
  acceptsChildren: true,
  props: {
    autoplay: {
      type: "boolean",
      label: "Autoplay",
      default: true
    },
    interval: {
      type: "select",
      label: "Autoplay Interval (ms)",
      default: "5000",
      options: ["3000", "4000", "5000", "6000", "8000"]
    },
    showArrows: {
      type: "boolean",
      label: "Show Arrows",
      default: true
    },
    showDots: {
      type: "boolean",
      label: "Show Dots",
      default: true
    },
    height: {
      type: "select",
      label: "Height",
      default: "500px",
      options: ["400px", "500px", "600px", "700px", "80vh", "100vh"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#111827"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "0",
      options: ["0", "16px", "24px", "32px", "48px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "0",
      options: ["0", "8px", "16px", "24px", "50%"]
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

export default function Slides({ 
  autoplay = true,
  interval = "5000",
  showArrows = true,
  showDots = true,
  height = "500px",
  backgroundColor = "#111827",
  padding = "0",
  borderRadius = "0",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px",
  children
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const items = React.Children.toArray(children);
  const hasItems = items.length > 0;

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  React.useEffect(() => {
    if (!autoplay || !hasItems || items.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, parseInt(interval));

    return () => clearInterval(timer);
  }, [autoplay, interval, hasItems, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{
      marginTop,
      marginBottom
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: height === "80vh" || height === "100vh" ? height : height,
        backgroundColor,
        padding,
        borderRadius: `${borderRadius}px`,
        boxShadow: boxShadowMap[boxShadow],
        overflow: "hidden"
      }}>
        <div style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * 100}%)`,
          height: "100%"
        }}>
          {hasItems ? items.map((item, index) => (
            <div key={index} style={{ minWidth: "100%", height: "100%" }}>
              {item}
            </div>
          )) : (
            <div style={{ 
              minWidth: "100%", 
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              fontStyle: "italic"
            }}>
              Slides will be displayed here
            </div>
          )}
        </div>

        {showArrows && hasItems && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: "absolute",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"}
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"}
            >
              ›
            </button>
          </>
        )}

        {showDots && hasItems && items.length > 1 && (
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px"
          }}>
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: index === currentIndex ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = index === currentIndex ? "#ffffff" : "rgba(255, 255, 255, 0.8)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = index === currentIndex ? "#ffffff" : "rgba(255, 255, 255, 0.5)"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
