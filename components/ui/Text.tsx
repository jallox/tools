interface TextProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  muted?: boolean;
  code?: boolean;
}

export function Text({
  children,
  className = '',
  accent,
  muted,
  code,
}: TextProps) {
  const colorClass = accent ? 'text-accent'
    : muted ? 'text-text-body opacity-60'
    : 'text-text-body';

  const fontClass = code ? 'font-mono text-sm bg-bg-surface px-1 py-0.5 border border-border' : 'font-sans';

  return (
    <span className={`${fontClass} ${colorClass} ${className}`}>
      {children}
    </span>
  );
}
