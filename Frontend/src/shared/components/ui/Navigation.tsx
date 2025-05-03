import Box from "./Box";
import NavLabel from "./NavLabel";

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
          isActive("/home-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Trang chủ"
        link="/home-manager"
        order="first"
      />
      <NavLabel
        className={
          isActive("/account-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí tài khoản"
        link="/account-manager"
      />
      <NavLabel
        className={
          isActive("/product-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí sản phẩm"
        link="/product-manager"
      />
      <NavLabel
        className={
          isActive("/inventory-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí kho"
        link="/inventory-manager"
      />
      <NavLabel
        className={
          isActive("/sale-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí khuyến mãi"
        link="/sale-manager"
      />
      <NavLabel
        className={
          isActive("/statistics-manager")
            ? "bg-[var(--primary-color)] text-white"
            : ""
        }
        label="Quản lí thống kê"
        link="/statistics-manager"
      />
    </Box>
  );
}

export default Navigation;
