import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function Input({
  label,
  error,
  helpText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || React.useId();

  const baseClasses = 'input';
  const errorClasses = error ? 'border-[color:var(--color-error)] focus-visible:ring-[color:var(--color-error)]' : '';
  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <input id={inputId} className={classes} {...props} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helpText && !error && <p className="text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}