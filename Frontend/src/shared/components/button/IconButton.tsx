import TooltipWrapper from "../../utils/TooltipWrapper";
import { Link } from "react-router-dom";
import Icon from "../ui/DynamicIcon";
interface IconButtonProps {
  text: string;
  tooltipposition?: "top" | "bottom" | "left" | "right";
  width?: string;
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
    <TooltipWrapper text={text} position={tooltipposition}>
      <div
        className={`cursor-pointer inline-flex justify-center bg-[var(--secondary-color)] rounded-md px-2 items-center h-8 hover:text-[var(--primary-hover)] ${width} ${className}`}
        {...rest}
      >
        <Link to={link} className="flex items-center gap-[var(--smallest-gap)]">
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            className="hover:text-[var(--primary-hover)]"
          />
          <div className="my-auto">{text}</div>
        </Link>
        {children}
      </div>
    </TooltipWrapper>
  );
}

export default IconButton;
