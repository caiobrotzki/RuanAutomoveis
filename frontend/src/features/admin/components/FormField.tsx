import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({ label, htmlFor, required = false, children }: FormFieldProps) {
  return (
    <div>
      <label className="text-sm font-bold text-brand-900" htmlFor={htmlFor}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const fieldClassName =
  'w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-950 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-3 focus:ring-brand-100';
