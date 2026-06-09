export const json_config = {
  type: "Form",
  label: "Form",
  category: "Elements",
  description: "Contact form with customizable fields",
  icon: "fa-solid fa-envelope",
  acceptsChildren: false,
  props: {
    fields: {
      type: "textarea",
      label: "Fields (name|type|label|placeholder)",
      default: "name|text|Name|Enter your name\nemail|email|Email|Enter your email\nmessage|textarea|Message|Enter your message"
    },
    submitText: {
      type: "string",
      label: "Submit Button Text",
      default: "Submit"
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    labelColor: {
      type: "color",
      label: "Label Color",
      default: "#111827"
    },
    inputBackgroundColor: {
      type: "color",
      label: "Input Background Color",
      default: "#f9fafb"
    },
    inputTextColor: {
      type: "color",
      label: "Input Text Color",
      default: "#111827"
    },
    borderColor: {
      type: "color",
      label: "Border Color",
      default: "#d1d5db"
    },
    focusBorderColor: {
      type: "color",
      label: "Focus Border Color",
      default: "#4f46e5"
    },
    buttonColor: {
      type: "color",
      label: "Button Color",
      default: "#4f46e5"
    },
    buttonTextColor: {
      type: "color",
      label: "Button Text Color",
      default: "#ffffff"
    },
    buttonHoverColor: {
      type: "color",
      label: "Button Hover Color",
      default: "#4338ca"
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

export default function Form({ 
  fields = "name|text|Name|Enter your name\nemail|email|Email|Enter your email\nmessage|textarea|Message|Enter your message",
  submitText = "Submit",
  backgroundColor = "#ffffff",
  labelColor = "#111827",
  inputBackgroundColor = "#f9fafb",
  inputTextColor = "#111827",
  borderColor = "#d1d5db",
  focusBorderColor = "#4f46e5",
  buttonColor = "#4f46e5",
  buttonTextColor = "#ffffff",
  buttonHoverColor = "#4338ca",
  padding = "24px",
  borderRadius = "8px",
  boxShadow = "none",
  marginTop = "0", 
  marginBottom = "16px"
}) {
  const parseFields = () => {
    return fields.split('\n').map(line => {
      const parts = line.split('|');
      if (parts.length >= 4) {
        return {
          name: parts[0],
          type: parts[1],
          label: parts[2],
          placeholder: parts[3]
        };
      }
      return null;
    }).filter(Boolean);
  };

  const fieldList = parseFields();

  const boxShadowMap = {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: inputBackgroundColor,
    color: inputTextColor,
    border: `1px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    fontSize: "16px",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: labelColor,
    fontSize: "14px",
    fontWeight: "600"
  };

  return (
    <form style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom
    }}>
      {fieldList.map((field, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              rows="4"
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.target.style.borderColor = focusBorderColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = focusBorderColor}
              onBlur={(e) => e.target.style.borderColor = borderColor}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        style={{
          width: "100%",
          backgroundColor: buttonColor,
          color: buttonTextColor,
          border: "none",
          borderRadius: `${borderRadius}px`,
          padding: "14px 24px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = buttonColor}
      >
        {submitText}
      </button>
    </form>
  );
}
