import Box from "./Box";
import ProfileNavLabel from "./ProfileNavLabel";
import { ROUTES } from "../../paths";
import { useLocation } from "react-router-dom";
import IconNavLabel from "./IconNavLabel";

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
  return (
    <div
      className={`flex flex-col gap-[var(--smallest-gap)] ${className}`}
      {...rest}
    >
      <Box
        className="flex items-center justify-start p-[var(--medium-gap)]"
        width="auto"
        height="auto"
      >
        <h2 className="text-[var(--heading-1)]">Le Vo</h2>
      </Box>
      <Box
        className="flex flex-col items-center justify-start gap-[var(--medium-gap)] p-[var(--medium-gap)]"
        width="auto"
        height="100%"
      >
        <div className="flex items-center justify-start gap-[var(--small-gap)]">
          <IconNavLabel link={ROUTES.USER.USER_PROFILE}>
            <i className="bxr  bx-user-circle"></i>
          </IconNavLabel>
          <ProfileNavLabel
            label="Thông tin tài khoản"
            link={ROUTES.USER.USER_PROFILE}
            className={
              isActive(ROUTES.USER.USER_PROFILE)
                ? "text-[var(--primary-color)]"
                : ""
            }
          />
        </div>
        <ProfileNavLabel
          label="Lịch sử mua hàng"
          link={ROUTES.USER.BUY_HISTORY}
          className={
            isActive(ROUTES.USER.BUY_HISTORY)
              ? "text-[var(--primary-color)]"
              : ""
          }
        />
      </Box>
    </div>
  );
}

export default UserProfileNavigation;
