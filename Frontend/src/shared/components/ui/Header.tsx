import { VerticalLine } from "./";
import { handleLogout } from "../../../service/authService/handleLogout";
import { useState } from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
  name?: string;
  className?: string;
  [key: string]: any;
}

function Header({ children, name, className = "", ...rest }: HeaderProps) {
  const [showPopupLogOut, setShowPopupLogout] = useState(false);
  const navigate = useNavigate();

  // Giúp khi nhấn lại thẻ div Xin chào thì sẽ bật tắt nút Đăng xuất
  const togglePopupLogout = () => {
    setShowPopupLogout((prevState) => !prevState);
  };

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
          <div className="text-black heading2 font-medium">{name}</div>
        </div>

        {/* Right */}
        <div
          onClick={togglePopupLogout}
          className="relative flex items-center gap-[var(--small-gap)] cursor-pointer"
        >
          <div>
            <div className="text-black bg-[var(--secondary-color)] px-[var(--small-gap)] py-[var(--smallest-gap)] rounded-sm">
              Xin chào {name}
            </div>
            {showPopupLogOut && (
              <Button
                type="button"
                text="Đăng xuất"
                className="absolute !mt-[var(--small-gap)] right-0"
                onClick={() => handleLogout(navigate)}
              />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
