interface SelectButtonProps {
  text: string;
  name: string;
  value?: string;
  className?: string;
  [key: string]: any;
}

function SelectButton({
  text,
  name,
  value,
  className = "",
  ...rest
}: SelectButtonProps) {
  return (
    <label
      className={`inline-flex justify-between items-center h-8 rounded-md border border-[var(--secondary-color)] px-2 focus:outline-none focus:border-[var(--primary-color)] ${className}`}
      {...rest}
    >
      {text}
      <input
        className="accent-[var(--primary-color)]"
        type="radio"
        name={name}
        value={value}
      />
    </label>
  );
}

export default SelectButton;
