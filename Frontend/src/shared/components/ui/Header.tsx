import VerticalLine from "./VerticalLine";
import Avatar from "./Avatar";
import avatar from "../../../assets/avatar/avatar.jpg";

interface HeaderProps {
  children?: React.ReactNode;
  role?: string;
  className?: string;
  [key: string]: any;
}

function Header({ children, role, className = "", ...rest }: HeaderProps) {
  return (
    <div
      className={`flex justify-center bg-white w-screen ${className}`}
      {...rest}
    >
      <div className="flex justify-between w-[75%] h-full">
        {/* Left */}
        <div className="flex items-center gap-[var(--small-gap)] py-[12px]">
          <div className="heading2 font-bold text-[var(--primary-color)]">
            Gaming Gear
          </div>
          <VerticalLine height="25px" color="var(--primary-color)" />
          <div className="text-black heading2 font-medium">{role}</div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-[var(--small-gap)]">
          <Avatar size="45px" src={avatar} />
          <div>{role}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
<Header>
  <div className="bg-white w-screen h-[1px]"></div>
</Header>