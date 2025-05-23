interface SelectButtonProps {
  dataset: any[];
  className?: string;
  [key: string]: any;
}

function SelectButton({
  dataset = [],
  className = "",
  ...rest
}: SelectButtonProps) {
  return (
    <div className={`relative h-8 ${className}`}>
      <select
        className="w-full h-full rounded-md border border-[var(--secondary-color)] px-2 focus:outline-none focus:border-[var(--primary-color)] appearance-none"
        {...rest}
      >
        {dataset.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
      <i className="bx bxs-down-arrow text-[var(--primary-color)] absolute right-[var(--small-gap)] top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
    </div>
  );
}

export default SelectButton;
