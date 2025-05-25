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
      className={`flex justify-center bg-white w-screen ${className}`}
      {...rest}
    >
      <div className="flex justify-between w-[75%] h-full">
        {/* Left */}
        <div className=" flex items-center gap-[var(--small-gap)] py-[12px]">
          <div className="heading2 font-bold text-[var(--primary-color)]">
            Gaming Gear
          </div>
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
            onClick={() => handleLogout(navigate)}
            link={ROUTES.USER.BUY_HISTORY}
          ></IconButton>
          <IconButton
            text="Tài khoản"
            tooltipposition="bottom"
            iconName="BiSolidUserCircle"
            onClick={() => handleLogout(navigate)}
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
