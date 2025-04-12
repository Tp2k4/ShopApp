import Box from "./Box";
import NavLabel from "./NavLabel";

interface NavigationProps {
  className?: string;
  [key: string]: any;
}

function Navigation({ children, className = "", ...rest }: NavigationProps) {
  return (
    <Box
      className={`flex flex-col ${className}`}
      height="h-full"
      width="200px"
      {...rest}
    >
      <NavLabel label="Trang chủ" link="/home-manager" />
      <NavLabel label="Quản lí tài khoản" link="/account-manager" />
      <NavLabel label="Quản lí sản phẩm" link="/product-manager" />
      <NavLabel label="Quản lí kho" link="/inventory-manager" />
      <NavLabel label="Quản lí khuyến mãi" link="/sale-manager" />
      <NavLabel label="Quản lí thống kê" link="/dashboard-manager" />
    </Box>
  );
}

export default Navigation;
