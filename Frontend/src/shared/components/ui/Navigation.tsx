import { Box, NavLabel } from "./";
import { ROUTES } from "../../paths";

import { useLocation } from "react-router-dom";

interface NavigationProps {
  className?: string;
  [key: string]: any;
}

function Navigation({ children, className = "", ...rest }: NavigationProps) {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      className={`flex flex-col ${className}`}
      height="h-full"
      width="200px"
      {...rest}
    >
      <NavLabel
        className={
          isActive("/manager") ? "bg-[var(--primary-color)] text-white" : ""
        }
        label="Trang chủ"
        link={ROUTES.MANAGER.HOME}
        order="first"
      />
      <NavLabel
        className={
          isActive("/manager/account")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí tài khoản"
        link={ROUTES.MANAGER.ACCOUNT}
      />
      <NavLabel
        className={
          isActive("/manager/product")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí sản phẩm"
        link={ROUTES.MANAGER.PRODUCT}
      />
      <NavLabel
        className={
          isActive("/manager/inventory")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí kho"
        link={ROUTES.MANAGER.INVENTORY}
      />
      <NavLabel
        className={
          isActive("/manager/sale")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí khuyến mãi"
        link={ROUTES.MANAGER.SALE}
      />
      <NavLabel
        className={
          isActive("/manager/statistics")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí thống kê"
        link={ROUTES.MANAGER.STATISTICS}
      />
    </Box>
  );
}

export default Navigation;
