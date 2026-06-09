export const json_config = {
  type: "SocialIcons",
  label: "Social Icons",
  category: "Advanced",
  description: "Social media icons",
  icon: "fa-solid fa-share-nodes",
  acceptsChildren: false,
  props: {
    platforms: {
      type: "textarea",
      label: "Platforms (format: name|url per line)",
      default: "facebook|#\ntwitter|#\ninstagram|#\nlinkedin|#"
    },
    size: {
      type: "select",
      label: "Size (px)",
      default: "32",
      options: ["24", "32", "40", "48"]
    },
    gap: {
      type: "select",
      label: "Gap (px)",
      default: "16",
      options: ["8", "16", "24", "32"]
    }
  }
};

export default function SocialIcons({ platforms = "facebook|#\ntwitter|#\ninstagram|#\nlinkedin|#", size = "32", gap = "16" }) {
  const platformList = typeof platforms === "string"
    ? platforms.split("\n").filter(p => p.trim()).map(p => {
      const [name, url] = p.split("|");
      return { name: name?.trim() || "facebook", url: url?.trim() || "#" };
    })
    : platforms;

  const icons = {
    facebook: "📘",
    twitter: "🐦",
    instagram: "📷",
    linkedin: "💼",
    youtube: "📺",
    github: "🐙",
    dribbble: "🏀",
    behance: "🎨"
  };

  return (
    <div style={{ display: "flex", gap: `${gap}px` }}>
      {platformList.map((platform, index) => (
        <a
          key={index}
          href={platform.url}
          style={{ fontSize: `${size}px`, textDecoration: "none", transition: "transform 0.2s" }}
          title={platform.name}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {icons[platform.name] || "🔗"}
        </a>
      ))}
    </div>
  );
}
