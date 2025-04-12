import { Link } from "react-router-dom";

interface NavLabelProps {
  label: string;
  link: string;
  className?: string;
  [key: string]: any;
}

function NavLabel({ label, className = "", link, ...rest }: NavLabelProps) {
  return (
    <Link
      to={link}
      className={`rounded-lg w-full text-[var(--primary-color)] p-[var(--small-gap)] hover:bg-[var(--primary-hover)] hover:text-white active:bg-[var(--primary-color)] ${className}`}
      {...rest}
    >
      {label}
    </Link>
  );
}

export default NavLabel;
