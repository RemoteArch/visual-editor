export const json_config = {
  type: "Testimonial",
  label: "Testimonial",
  category: "Advanced",
  description: "Testimonial card",
  acceptsChildren: false,
  props: {
    quote: {
      type: "textarea",
      label: "Quote",
      default: "This is an amazing product! It changed my life completely."
    },
    author: {
      type: "string",
      label: "Author Name",
      default: "John Doe"
    },
    role: {
      type: "string",
      label: "Author Role",
      default: "CEO, Company"
    },
    avatar: {
      type: "string",
      label: "Avatar URL",
      default: "https://placehold.co/100x100"
    },
    className: {
      type: "classes",
      label: "Tailwind classes",
      default: "p-6 bg-white rounded-lg shadow-md"
    }
  }
};

export default function Testimonial({ quote = "This is an amazing product! It changed my life completely.", author = "John Doe", role = "CEO, Company", avatar = "https://placehold.co/100x100", className = "p-6 bg-white rounded-lg shadow-md" }) {
  return (
    <div className={className}>
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
}
