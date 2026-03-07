import { Field } from "formik";

export default function oldInput({
  name,
  label,
  as,
  rows,
  type,
}: {
  name: string;
  label: string;
  as?: "input" | "textarea";
  rows?: number;
  type?: string;
}) {
  return (
    <div className="flex flex-col grow gap-1">
      <label htmlFor={name} className="text-(--color-primary)">
        {label}
      </label>
      <Field
        className="w-full p-3 bg-(--theme-primary) border border-(--color-primary) 
        focus:outline-(--color-primary) focus-within:outline-none"
        name={name}
        as={as}
        rows={rows}
        type={type}
      />
    </div>
  );
}
