import InputField from "./InputField";

interface SearchFieldProps {
  width: string;
  className?: string;
  [key: string]: any;
}

function SearchField({
  width,
  type,
  className = "",
  ...rest
}: SearchFieldProps) {
  return (
    <div
      className={`rounded-md relative flex items-center bg-[var(--secondary-color)] ${width}`}
    >
      <InputField
        className={width}
        type="text"
        placeholder="Tìm kiếm..."
        {...rest}
      />
      <i className="bx bx-search absolute right-2 text-[18px]"></i>
    </div>
  );
}

export default SearchField;
