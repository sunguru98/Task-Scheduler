import React, { ButtonHTMLAttributes } from "react";
import "../styles/Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: string; // to select between a normal and inverted colored button
}

const Button: React.FC<ButtonProps> = React.memo(
  ({ mode = "", children, style, ...props }) => {
    // CSS IN JS
    // ---------------------------------------------------------------------------------
    const buttonStyles = {
      background: mode === "" ? "#9376B6" : "#FAF7FD",
      color: mode === "" ? "#FAF7FD" : "#9376B6",
      borderColor: mode === "" ? "transparent" : "#9376B6",
      ...style
    };

    // RENDER - UI
    // -----------------------------------------------------------------------------------
    return (
      <button
        title={props.title}
        style={buttonStyles}
        className="Button"
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
