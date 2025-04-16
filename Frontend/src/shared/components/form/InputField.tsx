interface InputFieldProps {
  placeholder: string;
  width?: string;
  type: string;
  className?: string;
  [key: string]: any;
}

function InputField({
  placeholder,
  width,
  type,
  className = "",
  ...rest
}: InputFieldProps) {
  return (
    <input
      className={`h-8 rounded-md border border-[var(--secondary-color)] px-2 focus:outline-none focus:border-[var(--primary-color)] ${className}`}
      type={type}
      placeholder={placeholder}
      style={{ width }}
      {...rest}
    />
  );
}

export default InputField;
