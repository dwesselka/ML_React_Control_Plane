import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-end gap-4 border-b px-6">
      <ThemeToggle />
    </header>
  );
}
