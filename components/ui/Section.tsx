import { Text } from './Text';
import { Divider } from './Divider';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Section({ children, className = '', title }: SectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      {title && (
        <div className="mb-8">
          <Text accent className="text-sm uppercase tracking-widest font-sans mb-2 block">
            {title}
          </Text>
          <Divider />
        </div>
      )}
      {children}
    </section>
  );
}
