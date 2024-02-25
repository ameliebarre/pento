import { ComponentProps } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { clsx } from "clsx";

interface InputFormProps<T extends FieldValues>
  extends ComponentProps<"input"> {
  register: UseFormRegister<T>;
  label?: string;
  name: Path<T>;
  required?: boolean;
  error?: FieldError;
}

export default function InputForm<T extends FieldValues>({
  register,
  label,
  name,
  required = false,
  error,
  ...rest
}: InputFormProps<T>) {
  return (
    <div className="flex flex-col mb-4 w-full">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        {...register(name, { required })}
        id={name}
        name={name}
        className={clsx(
          "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
          "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
          error &&
            "border-error-300 focus:border-error-300 focus:ring-error-100",
        )}
        {...rest}
      />
      {error && <p className="text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
