import InputField from "./InputField";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}
function LabeledInputField({
  label,
  placeholder,
  value,
  onChange,
  width = "",
}: Props) {
  return (
    <div className="flex items-center">
      <div className="w-[180px]">
        <strong>{label}</strong>
      </div>
      <InputField
        value={value}
        onChange={onChange}
        width={width || "w-1/2"}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export default LabeledInputField;