interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function Select({ value, onChange, options, className = '' }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-border bg-bg-surface text-text-body font-sans p-3 focus:outline-none focus:border-accent transition-colors cursor-pointer ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-bg-surface">
          {option.label}
        </option>
      ))}
    </select>
  );
}
