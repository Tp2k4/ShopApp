interface CancelButtonProps {
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
}: CancelButtonProps) {
  return (
    <button
      className={`h-8 flex justify-center items-center bg-white 
        border border-[var(--primary-color)] rounded-md px-2
        text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] cursor-pointer ${className}`}
      type="button"
      style={{ width: width }}
      {...rest}
    >
      {text}
    </button>
  );
}

export default CancelButton;
