import { Link } from "react-router-dom";

interface ProfileNavLabelProps {
  label: string;
  link: string;
  className?: string;
  [key: string]: any;
}

function ProfileNavLabel({
  label,
  className = "",
  link,
  ...rest
}: ProfileNavLabelProps) {
  return (
    <Link
      to={link}
      className={`w-full text-[#000000] hover:text-[var(--primary-hover)] ${className}`}
      {...rest}
    >
      {label}
    </Link>
  );
}

export default ProfileNavLabel;
