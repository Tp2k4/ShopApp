import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../service/authService/handleLogout";
import IconButton from "../button/IconButton";
import { ROUTES } from "../../paths";
import { SearchField } from "../form";

import PopupConfirm from "../../../user/popup/PopupConfirm";

import { useState } from "react";

interface HeaderUserProps {
  children?: React.ReactNode;
  name?: string;
  className?: string;
  setProductInfos?: React.Dispatch<React.SetStateAction<any[]>>;
  [key: string]: any;
}

function HeaderUser({
  children,
  name,
  className = "",
  setProductInfos,
  // Thêm props searchQuery và setSearchQuery vào đây
  searchQuery,
  setSearchQuery,
  ...rest
}: HeaderUserProps) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handle = (navigateLink: string) => {
    const isLogin = localStorage.getItem("token") ? true : false;

    if (isLogin) {
      navigate(navigateLink);
      return;
    }

    setShowPopup(true);
  };

  return (
    <div
      className={`h-[var(--header-height)] flex justify-center bg-white w-full ${className}`}
      {...rest}
    >
      <div className="flex justify-between w-[90%]  max-w-[1200px] h-full">
        {/* Left */}
        <div className=" flex items-center gap-[var(--small-gap)] py-[12px]">
          <button
            className="heading2 font-bold text-[var(--primary-color)] cursor-pointer"
            type="button"
            onClick={() => navigate(ROUTES.USER.HOME)}
          >
            Gaming Gear
          </button>
        </div>
        <div className=" flex items-center gap-[var(--small-gap)] py-[12px]">
          <SearchField
            value={searchQuery}
            onChange={(e: any) => setSearchQuery && setSearchQuery(e.target.value)}
            width="300px"
          />
          <IconButton
            text="Giỏ hàng"
            tooltipposition="bottom"
            iconName="BiCart"
            onClick={() => {
              handle(ROUTES.USER.SHOPPING_CART);
            }}
          ></IconButton>
          <IconButton
            text="Lịch sử mua hàng"
            tooltipposition="bottom"
            iconName="BiHistory"
            onClick={() => {
              handle(ROUTES.USER.BUY_HISTORY);
            }}
          ></IconButton>
          <IconButton
            text="Tài khoản"
            tooltipposition="bottom"
            iconName="BiSolidUserCircle"
            onClick={() => {
              handle(ROUTES.USER.USER_PROFILE);
            }}
          ></IconButton>

          <IconButton
            text="Đăng xuất"
            tooltipposition="bottom"
            iconName="BiLogOut"
            onClick={() => handleLogout(navigate)}
          ></IconButton>
        </div>
      </div>
      {children}

      {showPopup && <PopupConfirm setShowPopup={setShowPopup} />}
    </div>
  );
}

export default HeaderUser;
