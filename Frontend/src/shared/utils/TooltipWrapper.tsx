import React from "react";

interface TooltipWrapperProps {
  text: string; // Nội dung của tooltip
  position?: "top" | "bottom" | "left" | "right"; // Vị trí hiển thị
  children: React.ReactNode; // Phần tử được bao quanh
  className?: string; // Class thêm cho wrapper
  tooltipClassName?: string; // Class thêm cho tooltip
}

const positionStyles: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  text,
  position = "top",
  children,
  className = "",
  tooltipClassName = "",
}) => {
  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div
        className={`absolute whitespace-nowrap pointer-events-none 
          opacity-0 group-hover:opacity-100 transition duration-200 
          bg-black text-white text-xs rounded px-2 py-1 z-10 
          ${positionStyles[position]} ${tooltipClassName}`}
      >
        {text}
      </div>
    </div>
  );
};

export default TooltipWrapper;
