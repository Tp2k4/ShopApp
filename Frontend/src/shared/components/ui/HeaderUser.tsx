import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../../service/authService/handleLogout";
import IconButton from "../button/IconButton";
import { ROUTES } from "../../paths";
import { SearchField } from "../form";
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
            // value={searchQuery}
            // onChange={(e: any) => setSearchQuery(e.target.value)}
            width="300px"
          />
          <IconButton
            text="Lịch sử mua hàng"
            tooltipposition="bottom"
            iconName="BiHistory"
            link={ROUTES.USER.BUY_HISTORY}
          ></IconButton>
          <IconButton
            text="Tài khoản"
            tooltipposition="bottom"
            iconName="BiSolidUserCircle"
            link={ROUTES.USER.USER_PROFILE}
          ></IconButton>
          <IconButton
            text="Đăng xuất"
            tooltipposition="bottom"
            iconName="BiLogOut"
            onClick={() => handleLogout(navigate)}
            link={ROUTES.AUTH.LOGIN}
          ></IconButton>
        </div>
      </div>
      {children}
    </div>
  );
}

export default HeaderUser;
