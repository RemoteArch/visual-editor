export const json_config = {
  type: "Login",
  label: "Login",
  category: "Elements",
  description: "User login form",
  icon: "fa-solid fa-right-to-bracket",
  acceptsChildren: false,
  props: {
    showRememberMe: {
      type: "boolean",
      label: "Show Remember Me",
      default: true
    },
    showForgotPassword: {
      type: "boolean",
      label: "Show Forgot Password Link",
      default: true
    },
    showRegisterLink: {
      type: "boolean",
      label: "Show Register Link",
      default: true
    },
    loginText: {
      type: "string",
      label: "Login Button Text",
      default: "Login"
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
    linkColor: {
      type: "color",
      label: "Link Color",
      default: "#4f46e5"
    },
    padding: {
      type: "select",
      label: "Padding",
      default: "32px",
      options: ["16px", "24px", "32px", "40px", "48px"]
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

export default function Login({ 
  showRememberMe = true,
  showForgotPassword = true,
  showRegisterLink = true,
  loginText = "Login",
  backgroundColor = "#ffffff",
  labelColor = "#111827",
  inputBackgroundColor = "#f9fafb",
  inputTextColor = "#111827",
  borderColor = "#d1d5db",
  focusBorderColor = "#4f46e5",
  buttonColor = "#4f46e5",
  buttonTextColor = "#ffffff",
  buttonHoverColor = "#4338ca",
  linkColor = "#4f46e5",
  padding = "32px",
  borderRadius = "8px",
  boxShadow = "md",
  marginTop = "0", 
  marginBottom = "16px"
}) {
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

  const linkStyle = {
    color: linkColor,
    textDecoration: "none",
    fontSize: "14px",
    transition: "opacity 0.2s ease"
  };

  return (
    <form style={{
      backgroundColor,
      padding,
      borderRadius: `${borderRadius}px`,
      boxShadow: boxShadowMap[boxShadow],
      marginTop,
      marginBottom,
      maxWidth: "400px"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = focusBorderColor}
          onBlur={(e) => e.target.style.borderColor = borderColor}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = focusBorderColor}
          onBlur={(e) => e.target.style.borderColor = borderColor}
        />
      </div>

      {showRememberMe && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id="remember"
            style={{ marginRight: "8px" }}
          />
          <label htmlFor="remember" style={{ color: labelColor, fontSize: "14px", margin: 0 }}>
            Remember me
          </label>
        </div>
      )}

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
          transition: "background-color 0.2s ease",
          marginBottom: "16px"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = buttonColor}
      >
        {loginText}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {showForgotPassword && (
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.opacity = "0.8"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Forgot password?
          </a>
        )}
        {showRegisterLink && (
          <a
            href="#"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.opacity = "0.8"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Register
          </a>
        )}
      </div>
    </form>
  );
}
