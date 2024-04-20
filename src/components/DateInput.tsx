interface Props {
  label?: string;
  disabled?: boolean;
  setExternalValue?: (value: Date) => void;
  value?: Date;
}

const DateInput = (props: Props) => {
  const { label, disabled, setExternalValue, value } = props;

  return (
    <div>
      <p className="text-gray-500">{label ?? "Fecha"}</p>
      <input
        disabled={disabled}
        className="w-52 h-10 text-gray-700 bg-white flex text-sm  border focus:outline-none rounded-md p-2.5 truncate "
        type="date"
        placeholder="Fecha"
        value={value?.toISOString().split("T")[0]}
        onChange={(e) => setExternalValue?.(new Date(e.target.value))}
        max={new Date().toISOString().split("T")[0]}
        min={new Date("2012-01-01").toISOString().split("T")[0]}
      />
    </div>
  );
};

export default DateInput;
