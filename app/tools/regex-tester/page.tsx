'use client';

import { useState, useCallback, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Title } from '@/components/ui/Title';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('(\\w+)@(\\w+\\.)+\\w+');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('Contact us at support@example.com or sales@company.org for more info.');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const validateRegex = useCallback(() => {
    try {
      new RegExp(pattern, flags);
      setError(null);
      return true;
    } catch (e: unknown) {
      const error = e as Error;
      setError(error.message);
      setMatches([]);
      setHighlightedText('');
      return false;
    }
  }, [pattern, flags]);

  const runTest = useCallback(() => {
    if (!validateRegex()) return;
    
    const regex = new RegExp(pattern, flags);
    const allMatches: string[] = [];
    let match;
    
    if (flags.includes('g')) {
      while ((match = regex.exec(testString)) !== null) {
        allMatches.push(match[0]);
      }
    } else {
      match = regex.exec(testString);
      if (match) allMatches.push(match[0]);
    }
    
    setMatches(allMatches);
    
    if (allMatches.length > 0) {
      const parts = testString.split(new RegExp(`(${pattern})`, flags.includes('g') ? 'g' : undefined));
      const highlighted = parts.map((part, i) => {
        if (i % 2 === 1) {
          return `<mark class="bg-accent/30 text-accent">${part}</mark>`;
        }
        return part;
      }).join('');
      setHighlightedText(highlighted);
    } else {
      setHighlightedText(testString);
    }
  }, [pattern, flags, testString, validateRegex]);

  const clearAll = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setError(null);
    setHighlightedText('');
  };

  const copyMatch = async (match: string, index: number) => {
    await navigator.clipboard.writeText(match);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const loadExample = (example: 'email' | 'phone' | 'url' | 'ip') => {
    const examples = {
      email: {
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        flags: 'gi',
        text: 'Emails: user@example.com, test.email+tag@domain.co.uk, invalid@ @test.com'
      },
      phone: {
        pattern: '\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
        flags: 'g',
        text: 'Phones: +1-234-567-890, (123) 456-7890, 123.456.7890'
      },
      url: {
        pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+',
        flags: 'gi',
        text: 'URLs: https://example.com, http://test.org/path?q=1, ftp://invalid.com'
      },
      ip: {
        pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
        flags: 'g',
        text: 'IPs: 192.168.1.1, 10.0.0.255, 999.999.999.999, 172.16.0.1'
      }
    };
    
    const ex = examples[example];
    setPattern(ex.pattern);
    setFlags(ex.flags);
    setTestString(ex.text);
  };

  useEffect(() => {
    if (pattern && testString) {
      runTest();
    }
  }, [pattern, flags, testString]);

  return (
    <main className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <Badge accent>TESTING</Badge>
        </div>
        <Title level={1} className="mb-4">Regex Tester</Title>
        <Text muted className="mb-8">Test and create regular expressions with real-time matching</Text>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div>
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-4 block">Pattern</Text>
              <div className="flex gap-2 mb-4">
                <Input
                  value={pattern}
                  onChange={(v) => { setPattern(v); setError(null); }}
                  placeholder="Enter regex pattern..."
                  className="flex-1 font-mono text-sm"
                />
                <Input
                  value={flags}
                  onChange={(v) => setFlags(v)}
                  placeholder="flags"
                  className="w-20 font-mono text-sm text-center"
                />
              </div>
              
              {error && (
                <div className="border border-red-500/50 bg-red-500/10 p-3 mb-4">
                  <Text className="text-sm text-red-400">{error}</Text>
                </div>
              )}

              <Text className="text-sm uppercase tracking-wide mb-4 block mt-6">Test String</Text>
              <textarea
                value={testString}
                onChange={(e) => { setTestString(e.target.value); setError(null); }}
                placeholder="Enter text to test against..."
                className="w-full h-48 bg-bg-base border border-border text-text-body font-mono text-sm p-4 focus:outline-none focus:border-accent resize-none mb-4"
              />

              <div className="flex gap-4 mb-6">
                <Button onClick={runTest} disabled={!pattern || !testString}>
                  Test Regex
                </Button>
                <Button onClick={clearAll} disabled={!pattern && !testString}>
                  Clear
                </Button>
              </div>

              <Text className="text-sm uppercase tracking-wide mb-3 block">Examples</Text>
              <div className="flex gap-2">
                {(['email', 'phone', 'url', 'ip'] as const).map((type) => (
                  <Button
                    key={type}
                    onClick={() => loadExample(type)}
                    className="text-xs py-2 px-3"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </Box>
          </div>

          <div>
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-4 block">Matches ({matches.length})</Text>
              
              {highlightedText && (
                <div className="border border-border p-4 bg-bg-base mb-6 min-h-[100px]">
                  <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
                </div>
              )}

              {matches.length === 0 ? (
                <Text muted className="text-sm">No matches found</Text>
              ) : (
                <div className="space-y-2">
                  {matches.map((match, i) => (
                    <div key={i} className="border border-border p-3 bg-bg-base hover:border-accent transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <code className="font-mono text-sm flex-1">{match}</code>
                        <Button
                          onClick={() => copyMatch(match, i)}
                          className="px-3 py-1 text-xs"
                        >
                          {copiedIndex === i ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Divider className="my-6" />

              <Text className="text-sm uppercase tracking-wide mb-4 block">Quick Reference</Text>
              <div className="space-y-2 text-xs font-mono">
                {[
                  { char: '.', desc: 'Any character except newline' },
                  { char: '\\w', desc: 'Word character [a-zA-Z0-9_]' },
                  { char: '\\d', desc: 'Digit [0-9]' },
                  { char: '\\s', desc: 'Whitespace' },
                  { char: '^', desc: 'Start of string' },
                  { char: '$', desc: 'End of string' },
                  { char: '*', desc: '0 or more' },
                  { char: '+', desc: '1 or more' },
                  { char: '?', desc: '0 or 1' },
                  { char: '{n,m}', desc: 'Between n and m times' },
                  { char: '[abc]', desc: 'Any of a, b, or c' },
                  { char: '[^abc]', desc: 'Not a, b, or c' },
                  { char: '(x)', desc: 'Capture group' },
                  { char: '(?:x)', desc: 'Non-capture group' },
                ].map(({ char, desc }) => (
                  <div key={char} className="flex gap-4">
                    <Text className="text-accent w-20">{char}</Text>
                    <Text muted>{desc}</Text>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        </div>
      </Container>
    </main>
  );
}


// Shit, this was really hard to have working
// Hopefully it won't cause many troubles...
// Love if someone reads this ❤️