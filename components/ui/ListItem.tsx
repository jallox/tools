interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ListItem({ children, className = '' }: ListItemProps) {
  return (
    <li className={`border-b border-border last:border-b-0 p-4 font-sans text-text-body ${className}`}>
      {children}
    </li>
  );
}
