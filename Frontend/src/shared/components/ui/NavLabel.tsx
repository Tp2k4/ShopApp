import { Link } from "react-router-dom";

interface NavLabelProps {
  label: string;
  link: string;
  order?: string;
  className?: string;
  [key: string]: any;
}

function NavLabel({
  label,
  className = "",
  order,
  link,
  ...rest
}: NavLabelProps) {
  // Bo góc tròn cho 2 góc phía trên của NavLabel đầu tiên
  let rounded_top_first_label = "";
  if (order) {
    rounded_top_first_label = "rounded-t-lg";
  }

  return (
    <Link
      to={link}
      className={`${rounded_top_first_label} w-full text-[var(--primary-color)] px-[var(--medium-gap)] py-[var(--small-gap)] hover:bg-[var(--primary-hover)] hover:text-white  active:text-white active:bg-[var(--primary-color)] ${className}`}
      {...rest}
    >
      {label}
    </Link>
  );
}

export default NavLabel;
