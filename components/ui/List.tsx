interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export function List({ children, className = '' }: ListProps) {
  return (
    <ul className={`list-none ${className}`}>
      {children}
    </ul>
  );
}
