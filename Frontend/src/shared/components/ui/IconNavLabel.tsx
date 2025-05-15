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
    <img src="..../assets/"
  );
}

export default ProfileNavLabel;
