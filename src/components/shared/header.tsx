import { cn } from "@/src/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-gradient-to-r from-slate-800 to-slate-900 p-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0",
        className,
      )}
    >
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
    </header>
  );
}
