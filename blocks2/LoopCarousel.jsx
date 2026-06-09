import React from "react";

export const json_config = {
  type: "LoopCarousel",
  label: "Loop Carousel",
  category: "Loop",
  description: "Dynamic carousel for looped content",
  icon: "fa-solid fa-rotate",
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
      default: "3000",
      options: ["2000", "3000", "4000", "5000", "6000"]
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
      default: "300px",
      options: ["200px", "300px", "400px", "500px", "auto"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#f9fafb"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px", "32px"]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      default: "8px",
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

export default function LoopCarousel({ 
  autoplay = true,
  interval = "3000",
  showArrows = true,
  showDots = true,
  height = "300px",
  backgroundColor = "#f9fafb",
  padding = "16px",
  borderRadius = "8px",
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
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: height === "auto" ? "auto" : height,
        overflow: "hidden",
        borderRadius: `${borderRadius}px`
      }}>
        <div style={{
          display: "flex",
          transition: "transform 0.3s ease",
          transform: `translateX(-${currentIndex * 100}%)`
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
              Loop items will be displayed here
            </div>
          )}
        </div>

        {showArrows && hasItems && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)"}
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                transition: "background-color 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)"}
            >
              ›
            </button>
          </>
        )}

        {showDots && hasItems && items.length > 1 && (
          <div style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px"
          }}>
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: "10px",
                  height: "10px",
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
