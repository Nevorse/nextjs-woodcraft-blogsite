import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type CombinedProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = {
  name: string;
  label?: string;
  as?: "input" | "textarea";
  rows?: number;
  type?: string;
  error?: string;
} & Partial<CombinedProps>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      name,
      label,
      rows,
      type = "text",
      value,
      onChange,
      as = "input",
      error,
      className,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const commonClassName = `w-full p-3 bg-(--theme-primary) shadow-md border border-(--color-primary) focus:outline-(--color-primary) focus-within:outline-none 
       ${error && "border-red-800"} ${className || ""}`;

    return (
      <div className="flex flex-col grow gap-1">
        {label && (
          <label htmlFor={name} className="text-(--color-primary)">
            {label}
          </label>
        )}

        {as === "input" && (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={commonClassName}
            placeholder={placeholder}
            ref={ref as React.Ref<HTMLInputElement>} // Ref'i cast ediyoruz
            {...props}
          />
        )}

        {as === "textarea" && (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={commonClassName}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        )}
        {error && <span className=" text-red-600/75 text-sm ">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
