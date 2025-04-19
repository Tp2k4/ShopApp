interface DetailButtonProps {
  text: string;
  width?: string;
  className?: string;
  [key: string]: any;
}

function DetailButton({
  text,
  width,
  className = "",
  ...rest
}: DetailButtonProps) {
  return (
    <button
      className={`gap-[var(--small-gap)] inline-flex justify-center items-center rounded-md h-8 border border-[var(--primary-color)] px-2 hover:border-[var(--primary-hover)] cursor-pointer ${width} ${className}`}
      {...rest}
    >
      {text}
      <i className="bx bxs-down-arrow text-[var(--primary-color)]"></i>
    </button>
  );
}

export default DetailButton;
