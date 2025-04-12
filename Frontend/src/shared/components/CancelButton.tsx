interface ButtonProps {
  text: string;
  width: string;
  className?: string;
  [key: string]: any;
}

function CancelButton({
  text,
  width,
  type,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center h-8 bg-white border border-[var(--primary-color)] rounded-md px-4 py-2 text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] cursor-pointer ${className}`}
      type="button"
      style={{ width: width }}
      {...rest}
    >
      {text}
    </button>
  );
}

export default CancelButton;
