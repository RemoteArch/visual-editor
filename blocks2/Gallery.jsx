import React from "react";

export const json_config = {
  type: "Gallery",
  label: "Gallery",
  category: "Media",
  description: "Advanced image gallery with filtering",
  icon: "fa-solid fa-images",
  acceptsChildren: false,
  props: {
    images: {
      type: "textarea",
      label: "Images (url|caption|category)",
      default: "https://via.placeholder.com/400x300|Image 1|Nature\nhttps://via.placeholder.com/400x300|Image 2|Architecture\nhttps://via.placeholder.com/400x300|Image 3|Nature\nhttps://via.placeholder.com/400x300|Image 4|Architecture\nhttps://via.placeholder.com/400x300|Image 5|People\nhttps://via.placeholder.com/400x300|Image 6|People"
    },
    columns: {
      type: "select",
      label: "Columns",
      default: "3",
      options: ["2", "3", "4", "5"]
    },
    gap: {
      type: "select",
      label: "Gap",
      default: "16px",
      options: ["8px", "12px", "16px", "20px", "24px"]
    },
    showFilter: {
      type: "boolean",
      label: "Show Filter",
      default: true
    },
    showCaptions: {
      type: "boolean",
      label: "Show Captions",
      default: true
    },
    hoverEffect: {
      type: "select",
      label: "Hover Effect",
      default: "zoom",
      options: ["none", "zoom", "darken", "lift"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    captionColor: {
      type: "color",
      label: "Caption Color",
      default: "#ffffff"
    },
    filterColor: {
      type: "color",
      label: "Filter Color",
      default: "#111827"
    },
    activeFilterColor: {
      type: "color",
      label: "Active Filter Color",
      default: "#4f46e5"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "24px",
      options: ["16px", "20px", "24px", "32px", "40px"]
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

export default function Gallery({ 
  images = "https://via.placeholder.com/400x300|Image 1|Nature\nhttps://via.placeholder.com/400x300|Image 2|Architecture\nhttps://via.placeholder.com/400x300|Image 3|Nature\nhttps://via.placeholder.com/400x300|Image 4|Architecture\nhttps://via.placeholder.com/400x300|Image 5|People\nhttps://via.placeholder.com/400x300|Image 6|People",
  columns = "3",
  gap = "16px",
  showFilter = true,
  showCaptions = true,
  hoverEffect = "zoom",
  backgroundColor = "#ffffff",
  captionColor = "#ffffff",
  filterColor = "#111827",
  activeFilterColor = "#4f46e5",
  padding = "24px",
  borderRadius = "8px",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const parseImages = () => {
    return images.split('\n').map(line => {
      const parts = line.split('|');
      if (parts.length >= 3) {
        return {
          url: parts[0],
          caption: parts[1],
          category: parts[2]
        };
      }
      return null;
    }).filter(Boolean);
  };

  const imageList = parseImages();
  const categories = ["All", ...new Set(imageList.map(img => img.category))];
  const filteredImages = selectedCategory === "All" 
    ? imageList 
    : imageList.filter(img => img.category === selectedCategory);

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const getHoverStyle = () => {
    switch (hoverEffect) {
      case "zoom":
        return { transform: "scale(1.05)" };
      case "darken":
        return { filter: "brightness(0.7)" };
      case "lift":
        return { transform: "translateY(-8px)", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" };
      default:
        return {};
    }
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
      {showFilter && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap"
        }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: selectedCategory === category ? activeFilterColor : "transparent",
                color: selectedCategory === category ? "#ffffff" : filterColor,
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.backgroundColor = `${filterColor}15`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap
      }}>
        {filteredImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: `${borderRadius}px`,
              cursor: "pointer",
              transition: "transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, getHoverStyle());
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={image.url}
              alt={image.caption}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: `${borderRadius}px`
              }}
            />
            {showCaptions && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: captionColor,
                padding: "12px",
                textAlign: "center",
                fontSize: "14px"
              }}>
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
