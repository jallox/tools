# Terminal Tools Portal

A curated collection of developer utilities built with **Next.js 16**, **TailwindCSS**, and a distinctive terminal-inspired design system.

## Design Philosophy

This project follows strict engineering principles:

- **Colors**: Background `#0a0a0a`, Surfaces `#111111`, Borders `1px solid #222222`
- **Typography**: Inter (sans-serif) for UI, JetBrains Mono (monospace) for code
- **Accent**: Blue-violet `#5b6af0` for CTAs and badges
- **Zero tolerance**: No border-radius, no shadows, no illustrations
- **Layout**: Centered at 1200px max-width with generous vertical padding
- **Animations**: Minimal opacity + translateY transitions

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portal.

## Project Structure

```
terminal-tools-portal/
├── app/
│   ├── tools/
│   │   ├── # Every tool is placed here
│   ├── layout.tsx
│   ├── page.tsx              # Homepage with tool listing
│   └── globals.css
├── components/
│   └── ui/                   # 23 reusable UI components
└── data/
    └── tools.ts               # Tool definitions
```

## UI Components

All components are built with reusability in mind. Import from `@/components/ui`.

### Layout Components

#### `Container`
Centered wrapper with max-width 1200px.
```tsx
<Container>...</Container>
```

#### `Box`
Surface container with border and background.
```tsx
<Box className="p-6">...</Box>
```

#### `Grid`
Responsive grid layout with configurable columns.
```tsx
<Grid cols={3}>...</Grid>
```

#### `Row` / `Column`
Flexbox helpers for horizontal/vertical layouts.
```tsx
<Row className="gap-4">...</Row>
<Column>...</Column>
```

#### `Section`
Section wrapper with optional title and top divider.
```tsx
<Section title="most famous">...</Section>
```

#### `Header`
Minimalist header bar with bottom border.
```tsx
<Header>...</Header>
```

### Typography Components

#### `Title`
Heading component (h1-h6) with white color and sans-serif font.
```tsx
<Title level={1}>Tools Portal</Title>
<Title level={2} className="mb-4">Subtitle</Title>
```

#### `Text`
Body text in `#cccccc` with optional accent/muted variants.
```tsx
<Text>Default body text</Text>
<Text accent>Accent colored</Text>
<Text muted>Subdued text</Text>
<Text code>monospace code</Text>
```

#### `Badge`
Small label with accent background for tags like "NEW" or "MOST FAMOUS".
```tsx
<Badge>NEW</Badge>
<Badge accent>FEATURED</Badge>
```

#### `Tag`
Underlined text for keywords and links.
```tsx
<Tag>keyword</Tag>
<Tag accent>highlighted</Tag>
```

### Interactive Components

#### `Button`
Primary action button with accent hover state.
```tsx
<Button onClick={handleClick}>Click me</Button>
<Button href="/tools">Link button</Button>
<Button disabled>Disabled</Button>
```

#### `Input`
Text input with border and focus states.
```tsx
<Input value={value} onChange={setValue} placeholder="Type..." />
<Input type="number" value={num} onChange={setNum} />
```

#### `Select`
Dropdown selector with custom styling.
```tsx
<Select
  value={sortBy}
  onChange={setSortBy}
  options={[
    { value: 'name', label: 'Name' },
    { value: 'date', label: 'Date' },
  ]}
/>
```

#### `Label`
Form label with consistent styling.
```tsx
<Label>Username</Label>
```

### Navigation Components

#### `Link`
Text link with accent hover effect.
```tsx
<Link href="/tools">Go to tools</Link>
<Link href="/about" blue>Blue link</Link>
```

#### `Divider`
Horizontal rule with border color.
```tsx
<Divider />
<Divider className="my-8" />
```

### Data Display Components

#### `Card`
Tool card with icon, title, description, and badges.
```tsx
<Card
  title="JSON Formatter"
  description="Format and validate JSON"
  icon="{}"
  href="/tools/json"
  badges={[{ text: 'NEW', accent: true }]}
/>
```

#### `List` / `ListItem`
Unordered list with border-separated items.
```tsx
<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

#### `Table`
Data table with headers and rows.
```tsx
<Table
  headers={['Name', 'Value']}
  rows={[['Key', 'Value']]}
/>
```

#### `Icon`
Monospace icon wrapper.
```tsx
<Icon>{ }</Icon>
```

### Utility Components

#### `Spacer`
Vertical spacing with predefined sizes.
```tsx
<Spacer size="sm" />   // 16px
<Spacer size="md" />   // 32px
<Spacer size="lg" />   // 64px
<Spacer size="xl" />   // 128px
```

#### `Progress`
Horizontal progress bar with accent fill.
```tsx
<Progress value={75} max={100} />
```

## Contributing

We encourage contributions! This project is designed for developers who appreciate clean, minimal interfaces and powerful tools.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-tool
   ```
3. **Add your tool** following the existing patterns:
   - Create a new folder in `app/tools/your-tool/`
   - Use the UI components from `@/components/ui`
   - Follow the design system (no rounded corners, no shadows)
   - Use monospace only for code fragments
4. **Update `data/tools.ts`** to include your tool in the listing
5. **Test your implementation**
   ```bash
   npm run build  # Ensure no TypeScript errors
   npm run dev   # Test manually
   ```
6. **Submit a pull request** with a clear description

### Guidelines

- **Design**: Maintain the terminal aesthetic - no rounded corners, no shadows, no illustrations
- **Colors**: Use only the defined palette (`--bg-base`, `--bg-surface`, `--border-color`, `--accent`)
- **Components**: Reuse existing UI components when possible
- **TypeScript**: Ensure full type safety
- **English only**: All UI text must be in English
- **Code style**: Use Tailwind utilities, avoid inline styles (except for dynamic colors)

### Adding a New Tool: Step-by-Step

1. Create the page file:
   ```bash
   mkdir -p app/tools/my-tool
   touch app/tools/my-tool/page.tsx
   ```

2. Use this template:
   ```tsx
   'use client';

   import { Container } from '@/components/ui/Container';
   import { Title } from '@/components/ui/Title';
   import { Text } from '@/components/ui/Text';
   import { Box } from '@/components/ui/Box';
   import { Button } from '@/components/ui/Button';
   import { Badge } from '@/components/ui/Badge';
   import { Divider } from '@/components/ui/Divider';

   export default function MyToolPage() {
     return (
       <main className="min-h-screen py-12">
         <Container>
           <div className="mb-8">
             <Badge accent>YOUR-CATEGORY</Badge>
           </div>
           <Title level={1} className="mb-4">Tool Name</Title>
           <Text muted className="mb-8">Tool description</Text>
           <Divider className="mb-12" />
           
           {/* Your tool implementation */}
         </Container>
       </main>
     );
   }
   ```

3. Add to `data/tools.ts`:
   ```typescript
   {
     id: '6',
     title: 'My Tool',
     description: 'Description of my tool',
     icon: 'IC',
     href: '/tools/my-tool',
     badges: [{ text: 'NEW', color: 'green' }],
     category: 'Category',
   }
   ```

## License

MIT License - feel free to use this project for your own tools portal.

## Credits

Built with:
- [Next.js 16](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Inter](https://fonts.google.com/specimen/Inter) - Sans-serif typography
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Monospace for code

---

**No rounded corners were harmed in the making of this UI**

[Javier Fernández](https://jayox.dev/)
