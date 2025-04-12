interface ButtonProps {
  text: string;
  width: string;
  type: "button" | "submit" | "reset";
  className?: string;
  [key: string]: any;
}

function Button({ text, width, type, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center h-8 bg-[var(--primary-color)] rounded-md px-4 py-2 text-white hover:bg-[var(--primary-hover)] cursor-pointer ${className}`}
      type={type}
      style={{ width: width }}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
