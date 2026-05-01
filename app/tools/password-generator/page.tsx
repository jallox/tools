'use client';

import { useState, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { Title } from '@/components/ui/Title';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export default function PasswordGeneratorPage() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [count, setCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePassword = useCallback((opts: PasswordOptions): string => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const ambiguous = 'Il1O0o';

    let charset = '';
    if (opts.uppercase) charset += uppercase;
    if (opts.lowercase) charset += lowercase;
    if (opts.numbers) charset += numbers;
    if (opts.symbols) charset += symbols;

    if (opts.excludeAmbiguous) {
      charset = charset.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (!charset) return '';

    let password = '';
    const array = new Uint32Array(opts.length);
    crypto.getRandomValues(array);
    for (let i = 0; i < opts.length; i++) {
      password += charset[array[i] % charset.length];
    }
    return password;
  }, []);

  const generatePasswords = () => {
    const newPasswords = Array.from({ length: count }, () => generatePassword(options));
    setPasswords(newPasswords);
  };

  const generateSafeString = () => {
    const safeChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const newPasswords = Array.from({ length: count }, () => {
      let result = '';
      const array = new Uint32Array(options.length);
      crypto.getRandomValues(array);
      for (let i = 0; i < options.length; i++) {
        result += safeChars[array[i] % safeChars.length];
      }
      return result;
    });
    setPasswords(newPasswords);
  };

  const copyToClipboard = async (password: string, index: number) => {
    await navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getStrength = (pwd: string): { label: string; color: string } => {
    if (pwd.length < 8) return { label: 'Weak', color: 'text-red-400' };
    if (pwd.length < 12) return { label: 'Fair', color: 'text-yellow-400' };
    if (pwd.length < 16) return { label: 'Good', color: 'text-blue-400' };
    return { label: 'Strong', color: 'text-green-400' };
  };

  return (
    <main className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <Badge accent>SECURITY</Badge>
        </div>
        <Title level={1} className="mb-4">Password Generator</Title>
        <Text muted className="mb-8">Generate secure passwords and safe strings with custom rules</Text>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Options</Text>
              
              <div className="mb-4">
                <label className="block text-sm text-text-body mb-2">Length</label>
                <Input
                  type="number"
                  value={options.length.toString()}
                  onChange={(v) => setOptions({ ...options, length: parseInt(v) || 16 })}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-text-body mb-2">Count</label>
                <Input
                  type="number"
                  value={count.toString()}
                  onChange={(v) => setCount(parseInt(v) || 1)}
                  className="w-full"
                />
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { key: 'uppercase', label: 'Uppercase (A-Z)' },
                  { key: 'lowercase', label: 'Lowercase (a-z)' },
                  { key: 'numbers', label: 'Numbers (0-9)' },
                  { key: 'symbols', label: 'Symbols (!@#...)' },
                  { key: 'excludeAmbiguous', label: 'Exclude ambiguous (I,l,1,O,0)' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options[key as keyof PasswordOptions] as boolean}
                      onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="w-4 h-4 border border-border bg-bg-base checked:bg-accent cursor-pointer"
                    />
                    <Text className="text-sm">{label}</Text>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <Button onClick={generatePasswords} className="w-full">
                  Generate Passwords
                </Button>
                <Button onClick={generateSafeString} className="w-full bg-bg-surface border-border">
                  Generate Safe Strings
                </Button>
              </div>
            </Box>
          </div>

          <div className="lg:col-span-2">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Results</Text>
              {passwords.length === 0 ? (
                <Text muted className="text-sm">Configure options and generate passwords</Text>
              ) : (
                <div className="space-y-3">
                  {passwords.map((pwd, i) => {
                    const strength = getStrength(pwd);
                    return (
                      <div key={i} className="border border-border p-4 bg-bg-base hover:border-accent transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <code className="font-mono text-sm flex-1 break-all">{pwd}</code>
                          <div className="flex items-center gap-3">
                            <Text className={`text-xs ${strength.color}`}>{strength.label}</Text>
                            <Button
                              onClick={() => copyToClipboard(pwd, i)}
                              className="px-3 py-1 text-xs"
                            >
                              {copiedIndex === i ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Box>
          </div>
        </div>
      </Container>
    </main>
  );
}

// Love if someone reads this ❤️