interface FilterButtonProps {
  filter: string[];
  width?: string;
  className?: string;
  [key: string]: any;
}

function FilterButton({
  filter = [],
  width,
  className = "",
  ...rest
}: FilterButtonProps) {
  return (
    <div className="relative w-fit">
      <select
        className={`rounded-md h-8 border border-[var(--secondary-color)] px-2 pr-8 focus:outline-none focus:border-[var(--primary-color)] ${width} ${className}`}
        {...rest}
      >
        {filter.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
      <i className="text-base text-[var(--primary-color)] bx bx-filter absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"></i>
    </div>
  );
}

export default FilterButton;
