interface InputFieldProps {
  placeholder: string;
  type: string;
  className?: string;
  [key: string]: any;
}

function InputField({
  placeholder,
  type,
  className = "",
  ...rest
}: InputFieldProps) {
  return (
    <input
      className={`h-8 rounded-md border border-[var(--secondary-color)] px-2 focus:outline-none focus:border-[var(--primary-color)] ${className}`}
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default InputField;
