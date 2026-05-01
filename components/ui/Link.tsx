interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`text-text-body hover:text-accent transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
}
