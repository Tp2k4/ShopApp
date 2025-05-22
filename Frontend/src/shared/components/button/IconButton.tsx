import TooltipWrapper from "../../utils/TooltipWrapper";
interface IconButtonProps {
  text: string;
  tooltipposition?: "top" | "bottom" | "left" | "right";
  width?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function IconButton({
  text,
  width,
  type = "button",
  children,
  tooltipposition = "top",
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <div>
      {" "}
      <TooltipWrapper text={text} position={tooltipposition}>
        <button
          className={`cursor-pointer h-8 ${width} ${className}`}
          type={type}
          {...rest}
        >
          {children}
        </button>
      </TooltipWrapper>
    </div>
  );
}

export default IconButton;
