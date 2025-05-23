import * as Icons from "react-icons/bi";
import React from "react";

interface IconProps {
  name: string; // Ví dụ: "FaBeer", "MdHome"
  size?: number | string; // Kích thước icon, ví dụ: 24, "1.5rem"
  color?: string; // Màu icon, ví dụ: "red", "#333"
  className?: string; // Tailwind hoặc class tùy chỉnh
  [key: string]: any;
}

function Icon({
  name,
  size = 18,
  color = "currentColor",
  className = "",
  ...rest
}: IconProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[
    name
  ];

  if (!IconComponent) {
    console.warn(`Icon "${name}" không tồn tại trong react-icons(Boxicon).`);
    return null;
  }

  return (
    <IconComponent size={size} color={color} className={className} {...rest} />
  );
}

export default Icon;
