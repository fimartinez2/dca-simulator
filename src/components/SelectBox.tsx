import { Listbox } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export interface Option {
  id: number | string | null;
  label: string | null;
  value?: boolean | number | string;
}

interface Props {
  placeholder: string;
  options: Option[];
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  setExternalValue?: (value: string) => void;
}

const SelectBox = (props: Props) => {
  const {
    options,
    placeholder,
    label,
    labelClassName,
    disabled,
    defaultValue,
    className,
    setExternalValue,
  } = props;

  const [value, setValue] = useState<Option>();

  const onChange = (value: Option) => {
    if (!value.label) return;
    setValue(value);
    setExternalValue?.(value.label);
  };

  useEffect(() => {
    if (defaultValue) {
      setExternalValue?.(defaultValue);
    }
  }, []);

  return (
    <Listbox onChange={onChange} disabled={disabled} value={options[0]}>
      <label className={`text-sm text-gray-500  ${labelClassName}`}>
        {label}
      </label>
      <div
        className={` text-gray-700 bg-white  flex text-sm  border focus:outline-none rounded-md p-2.5 w-full truncate ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "shadow"
        }`}
      >
        <div
          className={`flex justify-between w-full h-full gap-3  items-center  ${
            value?.label !== "" ? "text-zinc-700" : "text-zinc-400"
          }`}
        >
          <Listbox.Button
            className={`rounded-xl w-full focus:outline-none flex justify-between items-center h-full ${className}`}
          >
            <span
              className={`truncate text-left capitalize ${
                disabled && "text-zinc-500"
              }`}
            >
              {value && !disabled && value?.label !== ""
                ? value.label
                : placeholder}
            </span>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              expand_more
            </span>
          </Listbox.Button>
        </div>
      </div>
      <div className="relative">
        <Listbox.Options className="rounded border shadow-lg w-full top-1 absolute p-2 bg-white text-xs">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              as={Fragment}
              disabled={value?.label === option.label}
            >
              {({ active, disabled }) => (
                <li
                  className={`p-2  rounded truncate capitalize ${
                    active
                      ? "bg-neutral-300 text-purple-700"
                      : "bg-white text-black"
                  } ${
                    disabled
                      ? "!bg-primary-light !bg-opacity-10"
                      : "cursor-pointer"
                  }`}
                >
                  {option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SelectBox;
