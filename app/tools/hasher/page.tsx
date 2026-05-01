'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Title } from '@/components/ui/Title';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';

type HashType = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512' | 'Base64' | 'Base64URL' | 'Argon2' | 'Bcrypt';

interface HashResult {
  type: HashType;
  value: string;
}

export default function HasherPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<HashResult[]>([]);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  const generateHashes = async () => {
    if (!input) return;

    setIsHashing(true);
    const newResults: HashResult[] = [];

    try {
      const hashTypes: HashType[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'Base64', 'Base64URL', 'Argon2', 'Bcrypt'];

      for (const type of hashTypes) {
        try {
          const response = await fetch('/api/hash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input, type }),
          });

          if (response.ok) {
            const data = await response.json();
            newResults.push({ type, value: data.result });
          } else {
            newResults.push({ type, value: 'Error generating hash' });
          }
        } catch {
          newResults.push({ type, value: 'Error generating hash' });
        }
      }

      setResults(newResults);
    } finally {
      setIsHashing(false);
    }
  };

  const copyToClipboard = async (value: string, type: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <main className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <Badge accent>CRYPTO</Badge>
        </div>
        <Title level={1} className="mb-4">Hasher</Title>
        <Text muted className="mb-8">Generate MD5, SHA-1, SHA-256, SHA-512, Argon2, Bcrypt, Base64 hashes</Text>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-2">
            <Box className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full h-64 bg-bg-base border border-border text-text-body font-mono text-sm p-4 focus:outline-none focus:border-accent resize-none mb-4"
              />

              <div className="flex gap-4">
                <Button onClick={generateHashes} disabled={!input || isHashing}>
                  {isHashing ? 'Hashing...' : 'Generate Hashes'}
                </Button>
                <Button onClick={() => { setInput(''); setResults([]); }} disabled={!input}>
                  Clear
                </Button>
              </div>
            </Box>
          </div>

          <div className="lg:col-span-1">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Hash Types</Text>
              <div className="space-y-3">
                {(['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'Base64', 'Base64URL', 'Argon2', 'Bcrypt'] as HashType[]).map((type) => (
                  <div key={type} className="border border-border p-3 bg-bg-base">
                    <Text className="text-xs uppercase tracking-wider text-accent">{type}</Text>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-8">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Results</Text>
              <div className="space-y-3">
                {results.map((result) => (
                  <div key={result.type} className="border border-border p-4 bg-bg-base hover:border-accent transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Text className="text-xs uppercase tracking-wider text-accent mb-2 block">{result.type}</Text>
                        <code className="font-mono text-sm break-all">{result.value}</code>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(result.value, result.type)}
                        className="px-3 py-1 text-xs flex-shrink-0"
                      >
                        {copiedType === result.type ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        )}
      </Container>
    </main>
  );
}

// Love if someone reads this ❤️
