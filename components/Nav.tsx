import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';

export function Nav() {
  return (
    <nav className="border-b border-border bg-bg-surface">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <Text className="text-sm uppercase tracking-widest text-text-title">Tools</Text>
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-sm">Home</Link>
          <Link href="#tools" className="text-sm">Tools</Link>
          <Link href="https://github.com/jallox/tools" className="text-sm">GitHub</Link>
        </div>
      </div>
    </nav>
  );
}
