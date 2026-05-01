import type { ReactNode } from 'react';

interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const sizeMap = {
  1: 'text-4xl md:text-5xl',
  2: 'text-3xl md:text-4xl',
  3: 'text-2xl md:text-3xl',
  4: 'text-xl md:text-2xl',
  5: 'text-lg md:text-xl',
  6: 'text-base md:text-lg',
} as const;

export function Title({ children, level = 1, className = '' }: TitleProps) {
  const sizeClass = sizeMap[level];
  const content = (
    <span className={`font-sans text-text-title ${sizeClass} ${className}`}>
      {children}
    </span>
  );

  switch (level) {
    case 1: return <h1>{content}</h1>;
    case 2: return <h2>{content}</h2>;
    case 3: return <h3>{content}</h3>;
    case 4: return <h4>{content}</h4>;
    case 5: return <h5>{content}</h5>;
    case 6: return <h6>{content}</h6>;
    default: return <h1>{content}</h1>;
  }
}
