interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function Badge({
  children,
  className = '',
  accent,
}: BadgeProps) {
  const colorClass = accent ? 'text-accent bg-accent-transparent border-accent' : 'text-text-body bg-bg-surface border-border';

  return (
    <span className={`border px-2 py-1 text-xs font-sans uppercase tracking-wide ${colorClass} ${className}`}>
      {children}
    </span>
  );
}
