import React from "react";

export const json_config = {
  type: "ImageCarousel",
  label: "Image Carousel",
  category: "Media",
  description: "Image carousel with navigation controls",
  icon: "fa-solid fa-images",
  acceptsChildren: false,
  props: {
    images: {
      type: "textarea",
      label: "Image URLs (one per line)",
      default: "https://placehold.co/800x400\nhttps://placehold.co/800x400/ff0000\nhttps://placehold.co/800x400/00ff00"
    },
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
      default: "400px",
      options: ["200px", "300px", "400px", "500px", "600px", "auto"]
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      default: "cover",
      options: ["cover", "contain", "fill", "none", "scale-down"]
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
      default: "md",
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

export default function ImageCarousel({ 
  images = "https://placehold.co/800x400\nhttps://placehold.co/800x400/ff0000\nhttps://placehold.co/800x400/00ff00",
  autoplay = true,
  interval = "3000",
  showArrows = true,
  showDots = true,
  height = "400px",
  objectFit = "cover",
  borderRadius = "8px",
  boxShadow = "md",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const imageList = typeof images === "string" ? images.split("\n").filter(url => url.trim()) : images;

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  React.useEffect(() => {
    if (!autoplay || imageList.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, parseInt(interval));

    return () => clearInterval(timer);
  }, [autoplay, interval, imageList.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (imageList.length === 0) {
    return (
      <div style={{
        height,
        backgroundColor: "#f3f4f6",
        borderRadius: `${borderRadius}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        marginTop,
        marginBottom
      }}>
        No images provided
      </div>
    );
  }

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      overflow: "hidden",
      marginTop,
      marginBottom
    }}>
      <img
        src={imageList[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          display: "block"
        }}
      />
      
      {showArrows && imageList.length > 1 && (
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

      {showDots && imageList.length > 1 && (
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px"
        }}>
          {imageList.map((_, index) => (
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
  );
}
