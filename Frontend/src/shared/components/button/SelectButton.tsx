interface SelectButtonProps {
  text: string;
  className?: string;
  [key: string]: any;
}

function SelectButton({ text, className = "", ...rest }: SelectButtonProps) {
  return (
    <button
      className={`h-8 gap-[var(--small-gap)] inline-flex justify-center items-center
         bg-white border border-[var(--primary-color)] rounded-md px-2 text-[var(--primary-color)] 
         hover:bg-[var(--secondary-hover)] cursor-pointer ${className}`}
      type="button"
      {...rest}
    >
      {text}
      <i className="bx bxs-down-arrow text-[13px]"></i>
    </button>
  );
}

export default SelectButton;
