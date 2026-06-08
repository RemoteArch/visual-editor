export const json_config = {
  type: "SocialIcons",
  label: "Social Icons",
  category: "Advanced",
  description: "Social media icons",
  acceptsChildren: false,
  props: {
    platforms: {
      type: "textarea",
      label: "Platforms (format: name|url per line)",
      default: "facebook|#\ntwitter|#\ninstagram|#\nlinkedin|#"
    },
    size: {
      type: "select",
      label: "Size",
      default: "medium",
      options: ["small", "medium", "large"]
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "flex gap-4"
    }
  }
};

export default function SocialIcons({ platforms = "facebook|#\ntwitter|#\ninstagram|#\nlinkedin|#", size = "medium", className = "flex gap-4" }) {
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
  
  const sizeStyles = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl"
  };
  
  return (
    <div className={className}>
      {platformList.map((platform, index) => (
        <a
          key={index}
          href={platform.url}
          className={`${sizeStyles[size]} hover:scale-110 transition-transform`}
          title={platform.name}
        >
          {icons[platform.name] || "🔗"}
        </a>
      ))}
    </div>
  );
}
