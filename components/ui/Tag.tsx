interface TagProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function Tag({
  children,
  className = '',
  accent,
}: TagProps) {
  const colorClass = accent ? 'text-accent underline' : 'text-text-body underline';

  return (
    <span className={`${colorClass} ${className}`}>
      {children}
    </span>
  );
}
