interface ButtonProps {
  text: string;
  width: string;
  type: "button" | "submit" | "reset";
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function Button({
  text,
  width,
  type,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`h-8 inline-flex justify-center items-center 
        bg-[var(--primary-color)] rounded-md px-2
         text-white hover:bg-[var(--primary-hover)] cursor-pointer ${className}`}
      type={type}
      style={{ width: width }}
      {...rest}
    >
      {text}
      {children}
    </button>
  );
}

export default Button;
