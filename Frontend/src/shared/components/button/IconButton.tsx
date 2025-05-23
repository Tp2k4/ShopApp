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
          className={`cursor-pointer absolute !mt-[var(--small-gap)] right-0 inline-flex justify-center items-center 
        bg-[var(--primary-color)] rounded-md px-2 h-8 ${width} ${className}`}
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
