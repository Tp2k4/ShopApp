import { VerticalLine } from "./";

interface HeaderProps {
  children?: React.ReactNode;
  name?: string;
  className?: string;
  [key: string]: any;
}

function Header({ children, name, className = "", ...rest }: HeaderProps) {
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
          <div className="text-black heading2 font-medium">{name}</div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-[var(--small-gap)]">
          <div className="text-black bg-[var(--secondary-color)] px-[var(--small-gap)] py-[var(--smallest-gap)] rounded-sm">
            Xin chào {name}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;
