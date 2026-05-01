interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function Header({ children, className = '' }: HeaderProps) {
  return (
    <header className={`border-b border-border bg-bg-surface ${className}`}>
      {children}
    </header>
  );
}
