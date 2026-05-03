import { Badge } from './Badge';
import { Text } from './Text';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
  badges?: { text: string; accent?: boolean }[];
  className?: string;
}

export function Card({ title, description, icon, href, badges, className = '' }: CardProps) {
  const content = (
    <div className={`border border-border bg-bg-surface p-6 hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer group ${className}`}>
      {icon && (
        <div className="mb-4">
          <Text className="text-2xl font-mono opacity-60 group-hover:opacity-100">{icon}</Text>
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <Text className="text-lg font-sans text-text-title group-hover:text-white">{title}</Text>
        <Text muted className="text-sm">
          {description}
        </Text>
      </div>
      {badges && badges.length > 0 && (
        <div className="mt-4 flex gap-2">
          {badges.map((badge, i) => (
            <Badge key={i} accent={badge.accent}>
              {badge.text}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );

  if (href) {
    return <a href={href} className="no-underline block">{content}</a>;
  }

  return content;
}
