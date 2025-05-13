import Line from "./Line";
import Box from "./Box";
import Avatar from "./Avatar";
import avatar from "../../../assets/avatar/avatar.jpg";

interface UserProfileNavigationProps {
  className?: string;
  [key: string]: any;
}
function UserProfileNavigation({
  width,
  className = "",
  ...rest
}: UserProfileNavigationProps) {
  return (
    <Box className={`flex flex-col ${className}`} height="400px" width="25%">
      <div className="flex items-center justify-start gap-[var(--medium-gap)] p-[var(--medium-gap)]">
        <Avatar src={avatar} size="55px" alt="User Profile" />
        <h2 className="text-xl font-bold">Le Vo</h2>
      </div>
      <Line />
    </Box>
  );
}

export default UserProfileNavigation;
