import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  variant: "1" | "2" | "3";
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, variant, onClick }) => {
  const bgButton = () => {
    switch (variant) {
      case "1":
        return "linear-gradient(to right, #e91e63, #9c27b0)";
      case "2":
        return "linear-gradient(to right, #ff5f6d, #ff8c37)";
      case "3":
        return "linear-gradient(to right, #00e676, #00bcd4)";
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        "text-white font-bold text-2xl tracking-wide",
        "rounded-full px-6 py-4 cursor-pointer duration-300 hover:scale-110 ",
      )}
      style={{
        background: bgButton(),
      }}
    >
      {children}
    </button>
  );
};

export default Button;
