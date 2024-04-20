import { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClassName?: string;
  prefix?: string;
}

export const NumberInput: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, className, labelClassName, prefix, ...props }, ref) => {
  return (
    <>
      {label && (
        <label
          className={`text-sm text-gray-500 ${labelClassName}`}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      {prefix ? (
        <span
          className={` flex disabled:cursor-not-allowed placeholder:text-zinc-400 disabled:bg-gray-100 text-gray-700 text-sm border shadow disabled:shadow-none rounded-md p-2.5 w-full mt-3 mb-3 ${className}`}
        >
          {prefix}
          <input ref={ref} className="focus:outline-none ml-2" {...props} />
        </span>
      ) : (
        <input
          ref={ref}
          type="number"
          className={` disabled:cursor-not-allowed placeholder:text-zinc-400 disabled:bg-gray-100 text-gray-700 text-sm border shadow disabled:shadow-none focus:outline-none rounded-md p-2.5 w-full mt-3 mb-3  ${className}`}
          {...props}
        />
      )}
    </>
  );
});
