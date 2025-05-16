import { Link } from "react-router-dom";

interface IconNavLabelProps {
  link: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function IconNavLabel({ label, link, children, ...rest }: IconNavLabelProps) {
  return (
    <Link to={link} {...rest}>
      {children}
    </Link>
  );
}

export default IconNavLabel;
