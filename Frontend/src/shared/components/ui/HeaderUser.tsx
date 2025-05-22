import { VerticalLine } from "./";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../service/authService/handleLogout";
import IconButton from "../button/IconButton";

interface HeaderUserProps {
  children?: React.ReactNode;
  name?: string;
  className?: string;
  [key: string]: any;
}

function HeaderUser({
  children,
  name,
  className = "",
  ...rest
}: HeaderUserProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-center bg-white w-screen ${className}`}
      {...rest}
    >
      <div className="flex justify-between w-[75%] h-full">
        {/* Left */}
        <div className=" flex items-center gap-[var(--small-gap)] py-[12px]">
          <div className="heading2 font-bold text-[var(--primary-color)]">
            Gaming Gear
          </div>
          <VerticalLine height="25px" color="var(--primary-color)" />
        </div>
        <IconButton
          text="Logout"
          className="w-[10px]"
          tooltipposition="bottom"
          onClick={() => handleLogout(navigate)}
        >
          <i className="bx bx-user-circle icon-small"></i>
          Đăng xuất
        </IconButton>
      </div>
      {children}
    </div>
  );
}

export default HeaderUser;
