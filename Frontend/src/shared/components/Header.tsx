import VerticalLine from "./VerticalLine";
import Avatar from "../../shared/components/Avatar";
import avatar from "../../assets/avatar/avatar.jpg";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function Header({ children, className = "", ...rest }: HeaderProps) {
  return (
    <div
      className={`flex justify-center bg-white w-screen ${className}`}
      {...rest}
    >
      <div className="flex justify-between w-[70%] h-full">
        {/* Left */}
        <div className="flex items-center gap-[var(--small-gap)] py-[12px]">
          <div className="heading2 font-bold text-[var(--primary-color)]">
            Gaming Gear
          </div>
          <VerticalLine height="25px" color="var(--primary-color)" />
          <div className="text-black heading2 font-medium">Quản lí</div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-[var(--small-gap)]">
          <Avatar size="45px" src={avatar} />
          <div>Admin</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
