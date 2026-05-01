interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export function Box({ children, className = '' }: BoxProps) {
  return (
    <div className={`border-custom bg-bg-surface ${className}`}>
      {children}
    </div>
  );
}
