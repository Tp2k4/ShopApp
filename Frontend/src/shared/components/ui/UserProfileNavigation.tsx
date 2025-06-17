import Box from "./Box";
import ProfileNavLabel from "./ProfileNavLabel";
import { ROUTES } from "../../paths";
import { useLocation } from "react-router-dom";
import IconNavLabel from "./IconNavLabel";
import { useGet } from "../../../service/crudService";
import { useEffect } from "react";

interface UserProfileNavigationProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}
function UserProfileNavigation({
  className = "",
  children,
  ...rest
}: UserProfileNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  //================ Nhận accounts từ API
  const { data: userAccountInfo } = useGet(
    "https://gm-12tk.onrender.com/api/v1/gmshop/user/get-user"
  );

  return (
    <div
      className={`flex flex-col gap-[var(--smallest-gap)] ${className}`}
      {...rest}
    >
      <Box
        className="flex items-center justify-start p-[var(--medium-gap)] gap-[var(--small-gap)]"
        width="auto"
        height="auto"
      >
        <div className="heading2">{userAccountInfo.name}</div>
      </Box>
      <Box
        className="flex flex-col items-start gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        width="auto"
        height="100%"
      >
        <div className="flex items-center gap-[var(--small-gap)]">
          <IconNavLabel
            link={ROUTES.USER.USER_PROFILE}
            icon={<i className="bx bx-user-circle icon-small"></i>}
          ></IconNavLabel>
          <ProfileNavLabel
            label="Thông tin tài khoản"
            link={ROUTES.USER.USER_PROFILE}
            className={
              isActive(ROUTES.USER.USER_PROFILE)
                ? "font-bold text-[var(--primary-color)]"
                : ""
            }
          />
        </div>
        <div className="flex items-center gap-[var(--small-gap)]">
          <IconNavLabel
            link={ROUTES.USER.BUY_HISTORY}
            icon={<i className="bx bx-history icon-small"></i>}
          ></IconNavLabel>
          <ProfileNavLabel
            label="Lịch sử mua hàng"
            link={ROUTES.USER.BUY_HISTORY}
            className={
              isActive(ROUTES.USER.BUY_HISTORY)
                ? "font-bold text-[var(--primary-color)]"
                : ""
            }
          />
        </div>
      </Box>
    </div>
  );
}

export default UserProfileNavigation;
