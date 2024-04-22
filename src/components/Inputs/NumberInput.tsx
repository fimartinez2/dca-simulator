import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  prefix?: string;
}

const NumberInput = ({
  label,
  className,
  labelClassName,
  prefix,
  ...props
}: InputProps) => {
  return (
    <>
      {label && (
        <label className={`text-sm text-gray-500 ${labelClassName}`}>
          {label}
        </label>
      )}
      {prefix ? (
        <span
          className={` flex disabled:cursor-not-allowed placeholder:text-zinc-400 bg-white disabled:bg-gray-100 text-gray-700 text-sm border shadow disabled:shadow-none rounded-md p-2.5 w-full mt-3 mb-3 ${className}`}
        >
          {prefix}
          <input className="focus:outline-none ml-2" {...props} />
        </span>
      ) : (
        <input
          type="number"
          className={` disabled:cursor-not-allowed placeholder:text-zinc-400 disabled:bg-gray-100 text-gray-700 text-sm border shadow disabled:shadow-none focus:outline-none rounded-md p-2.5 w-full mt-3 mb-3  ${className}`}
          {...props}
        />
      )}
    </>
  );
};

export default NumberInput;
