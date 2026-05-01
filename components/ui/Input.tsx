interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
}

export function Input({ placeholder, value, onChange, className = '', type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`border border-border bg-bg-surface text-text-body font-sans p-3 focus:outline-none focus:border-accent transition-colors ${className}`}
    />
  );
}
