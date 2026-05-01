interface RowProps {
  children: React.ReactNode;
  className?: string;
}

export function Row({ children, className = '' }: RowProps) {
  return (
    <div className={`flex flex-row gap-0 ${className}`}>
      {children}
    </div>
  );
}
