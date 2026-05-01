interface ColumnProps {
  children: React.ReactNode;
  className?: string;
}

export function Column({ children, className = '' }: ColumnProps) {
  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      {children}
    </div>
  );
}
