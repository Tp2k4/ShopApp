import React from "react";
import { Link } from "react-router-dom";

interface IconNavLabelProps {
  link: string;
  className?: string;
  icon: React.ReactNode;
  [key: string]: any;
}

function IconNavLabel({ link, icon, ...rest }: IconNavLabelProps) {
  return (
    <Link to={link} {...rest}>
      {icon}
    </Link>
  );
}

export default IconNavLabel;
