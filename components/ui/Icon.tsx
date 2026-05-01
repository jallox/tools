interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export function Icon({ children, className = '' }: IconProps) {
  return (
    <span className={`font-mono text-sm ${className}`}>
      {children}
    </span>
  );
}
