import { handleLogout } from "../../../service/authService/handleLogout";
import { useState } from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navIsOpen: boolean;
  children?: React.ReactNode;
  name?: string;
  className?: string;
  [key: string]: any;
}

function Header({
  setNavIsOpen,
  navIsOpen,
  children,
  name,
  className = "",
  ...rest
}: HeaderProps) {
  const [showPopupLogOut, setShowPopupLogout] = useState(false);
  const navigate = useNavigate();

  // Giúp khi nhấn lại thẻ div Xin chào thì sẽ bật tắt nút Đăng xuất
  const togglePopupLogout = () => {
    setShowPopupLogout((prevState) => !prevState);
  };

  return (
    <div
      className={`h-[var(--header-height)] flex justify-center bg-white w-screen ${className}`}
      {...rest}
    >
      <div className="!mx-[var(--medium-gap)] flex justify-between  w-full h-full">
        {/* Left */}
        <div className=" flex items-center gap-[var(--medium-gap)] py-[12px]">
          <div className="heading2 font-bold text-[var(--primary-color)]">
            Gaming Gear
          </div>
          <i
            onClick={() => setNavIsOpen((prev) => !prev)}
            className="bg-[var(--secondary-color)] rounded-md bx bx-menu text-[24px] p-[2px] block lg:hidden"
          ></i>
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
