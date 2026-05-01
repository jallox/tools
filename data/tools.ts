export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  badges: { text: string; color: 'blue' | 'green' | 'yellow' | 'red' | 'cyan' | 'magenta' }[];
  category: string;
}

export const tools: Tool[] = [
  {
    id: '1',
    title: 'Syntax Checker',
    description: 'Validate JSON, YAML and TOML syntax with error highlighting',
    icon: '{}',
    href: '/tools/syntax-checker',
    badges: [
      { text: 'NEW', color: 'green' },
      { text: 'VALIDATOR', color: 'blue' },
    ],
    category: 'Validators',
  },
  {
    id: '2',
    title: 'Password Generator',
    description: 'Generate secure passwords and safe strings with custom rules',
    icon: 'PWD',
    href: '/tools/password-generator',
    badges: [
      { text: 'SECURITY', color: 'red' },
      { text: 'MOST FAMOUS', color: 'magenta' },
    ],
    category: 'Security',
  },
  {
    id: '3',
    title: 'Hasher',
    description: 'Generate MD5, SHA1, SHA256, SHA512, Argon2, Bcrypt hashes',
    icon: '#~',
    href: '/tools/hasher',
    badges: [
      { text: 'CRYPTO', color: 'red' },
      { text: 'MOST FAMOUS', color: 'magenta' },
    ],
    category: 'Security',
  },
  {
    id: '4',
    title: 'Color Tools',
    description: 'Pick colors and convert between HEX, RGB, HSL, CMYK formats',
    icon: 'CLR',
    href: '/tools/color-tools',
    badges: [
      { text: 'DESIGN', color: 'cyan' },
      { text: 'NEW', color: 'green' },
    ],
    category: 'Design',
  },
  {
    id: '5',
    title: 'Regex Tester',
    description: 'Test and create regular expressions with real-time matching',
    icon: '.*',
    href: '/tools/regex-tester',
    badges: [
      { text: 'TESTING', color: 'yellow' },
      { text: 'MOST FAMOUS', color: 'magenta' },
    ],
    category: 'Testing',
  },
];

export const categories = [...new Set(tools.map((tool) => tool.category))];
