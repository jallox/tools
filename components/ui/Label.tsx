interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className = '' }: LabelProps) {
  return (
    <label className={`font-sans text-text-body text-sm block mb-2 ${className}`}>
      {children}
    </label>
  );
}
