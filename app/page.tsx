import { Container } from '@/components/ui/Container';
import { Title } from '@/components/ui/Title';
import { Text } from '@/components/ui/Text';
import { Divider } from '@/components/ui/Divider';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spacer } from '@/components/ui/Spacer';
import { Section } from '@/components/ui/Section';
import { Grid } from '@/components/ui/Grid';
import { tools, categories } from '@/data/tools';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Container className="py-12">
        {/* Hero Section */}
        <section className="py-24 animate-fade-in-up">
          <div className="mb-4">
            <Badge accent>UTILITIES COLLECTION</Badge>
          </div>
          <Title level={1} className="mb-6">
            Tools for developers
          </Title>
          <Text muted className="text-lg max-w-2xl mb-8">
            A curated collection of utilities designed for developers who value efficiency and clean interfaces.
          </Text>
          <Divider className="max-w-md" />
        </section>



        {/* Featured Tools */}
        <Section title="most famous">
          <Grid cols={2}>
            {tools
              .filter(tool => tool.badges.some(b => b.text === 'MOST FAMOUS'))
              .map((tool, index) => (
                <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    href={tool.href}
                    badges={tool.badges.map(b => ({ text: b.text, accent: b.color === 'magenta' || b.color === 'blue' }))}
                  />
                </div>
              ))}
          </Grid>
        </Section>

        {/* New Tools */}
        <Section title="new releases">
          <Grid cols={3}>
            {tools
              .filter(tool => tool.badges.some(b => b.text === 'NEW'))
              .map((tool, index) => (
                <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    href={tool.href}
                    badges={tool.badges.map(b => ({ text: b.text, accent: b.color === 'green' || b.color === 'blue' }))}
                  />
                </div>
              ))}
          </Grid>
        </Section>

        {/* All Tools by Category */}
        {categories.map((category, catIndex) => (
          <Section key={category} title={category.toLowerCase()}>
            <Grid cols={3}>
              {tools
                .filter(tool => tool.category === category)
                .map((tool, index) => (
                  <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${(catIndex * 3 + index) * 50}ms` }}>
                    <Card
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      href={tool.href}
                      badges={tool.badges.map(b => ({ text: b.text, accent: ['blue', 'green', 'magenta'].includes(b.color) }))}
                    />
                  </div>
                ))}
            </Grid>
          </Section>
        ))}

        {/* Footer */}
        <footer className="border border-border bg-bg-surface p-8 text-center mt-12">
          <Text muted className="text-sm">
            Tools Portal — Built with <Text accent>Next.js 16</Text> + <Text accent>TailwindCSS</Text>
          </Text>
          <Spacer size="sm" />
          <Text muted className="text-xs">
            Tools provided by <a href="https://jayox.dev/" className="text-accent hover:underline">Jayox</a> and the <a href="https://github.com/jallox/tools" className="text-accent hover:underline">Github contributors</a>.
          </Text>
        </footer>
      </Container>
    </main>
  );
}

// Love if someone reads this ❤️
