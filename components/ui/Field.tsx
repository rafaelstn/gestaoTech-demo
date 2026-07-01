import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

const INPUT_BASE =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-brand-900 placeholder:text-slate-400 focus:border-tech-400 focus:outline-none focus:ring-2 focus:ring-tech-100";

export function TextInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(INPUT_BASE, className)} {...props} />;
}

export function SearchInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input className={cn(INPUT_BASE, "pl-9")} {...props} />
    </div>
  );
}

export function SelectField({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(INPUT_BASE, "cursor-pointer pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-900 placeholder:text-slate-400 focus:border-tech-400 focus:outline-none focus:ring-2 focus:ring-tech-100",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-slate-600">{children}</label>;
}
