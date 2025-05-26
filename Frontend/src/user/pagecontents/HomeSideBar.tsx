import { Box, NavLabel } from "../../shared/components/ui";
import { ROUTES } from "../../shared/paths";

import { useLocation } from "react-router-dom";

interface HomeSideBarProps {
  className?: string;
  [key: string]: any;
}

function HomeSideBar({ children, className = "", ...rest }: HomeSideBarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      className={`rounded-none h-auto w-50 flex flex-col ${className}`}
      {...rest}
    >
      <NavLabel
        className={
          isActive("/manager") ? "bg-[var(--primary-color)] text-white" : ""
        }
        label="Chuột"
        link={ROUTES.MANAGER.HOME}
      />
      <NavLabel
        className={
          isActive("/manager/account")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Bàn phím"
        link={ROUTES.MANAGER.ACCOUNT}
      />
      <NavLabel
        className={
          isActive("/manager/product")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Tai nghe"
        link={ROUTES.MANAGER.PRODUCT}
      />
    </Box>
  );
}

export default HomeSideBar;
