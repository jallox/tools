interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  disabled?: boolean;
}

export function Button({ children, onClick, className = '', href, disabled }: ButtonProps) {
  const baseClass = `border border-border bg-bg-surface px-6 py-3 text-text-body hover:bg-accent hover:text-white transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  if (href && !disabled) {
    return (
      <a href={href} className={`${baseClass} ${className} inline-block`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}
