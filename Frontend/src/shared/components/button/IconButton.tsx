import TooltipWrapper from "../../utils/TooltipWrapper";
import { Link } from "react-router-dom";
import Icon from "../ui/DynamicIcon";
interface IconButtonProps {
  text: string;
  tooltipposition?: "top" | "bottom" | "left" | "right";
  width?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
  link: string;
  iconName: string;
  iconSize?: number | string;
  iconColor?: string;
  [key: string]: any;
}

function IconButton({
  text,
  width,
  type = "button",
  children,
  tooltipposition = "top",
  iconSize = 18,
  iconColor = "currentColor",
  iconName,
  className = "",
  link,
  ...rest
}: IconButtonProps) {
  return (
    <div>
      {" "}
      <TooltipWrapper text={text} position={tooltipposition}>
        <button
          className={`cursor-pointer !mt-[var(--small-gap)] inline-flex justify-center items-center 
        bg-white px-2 h-8 hover:text-[var(--primary-hover)] ${width} ${className}`}
          type={type}
          {...rest}
        >
          <Link to={link} className="flex">
            <Icon
              name={iconName}
              size={iconSize}
              color={iconColor}
              className="hover:text-[var(--primary-hover)]"
            />
            {text}
          </Link>
          {children}
        </button>
      </TooltipWrapper>
    </div>
  );
}

export default IconButton;
