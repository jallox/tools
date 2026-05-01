interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className = '' }: ProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={`border border-border h-6 bg-bg-surface ${className}`}>
      <div
        className="bg-accent h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
