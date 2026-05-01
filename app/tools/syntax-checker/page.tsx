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

type FormatType = 'json' | 'yaml' | 'toml';

interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export default function SyntaxCheckerPage() {
  const [input, setInput] = useState('');
  const [format, setFormat] = useState<FormatType>('json');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const validateJSON = (text: string): ValidationResult => {
    try {
      JSON.parse(text);
      return { valid: true };
    } catch (e: unknown) {
      const error = e as Error;
      const match = error.message.match(/position (\d+)/);
      let line = 1, column = 1;
      if (match) {
        const pos = parseInt(match[1]);
        const lines = text.substring(0, pos).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
      return { valid: false, error: error.message, line, column };
    }
  };

  const validateYAML = (text: string): ValidationResult => {
    try {
      const lines = text.split('\n');
      let inMultiline = false;
      let multilineChar = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (trimmed.startsWith('#') || !trimmed) continue;
        
        if (trimmed.includes(':')) {
          const colonIndex = trimmed.indexOf(':');
          const key = trimmed.substring(0, colonIndex).trim();
          const value = trimmed.substring(colonIndex + 1).trim();
          
          if (value === '|' || value === '>') {
            inMultiline = true;
            multilineChar = value;
            continue;
          }
          
          if (value.startsWith('|') || value.startsWith('>')) {
            continue;
          }
          
          if (value && !value.startsWith('"') && !value.startsWith("'") && 
              !value.startsWith('{') && !value.startsWith('[') &&
              !value.startsWith('&') && value !== '|' && value !== '>') {
            if (value.includes(': ') && !value.match(/^\d/)) {
              return { valid: false, error: `Invalid value at line ${i + 1}: unexpected colon`, line: i + 1 };
            }
          }
        }
        
        if (inMultiline) {
          if (trimmed === '...' || (trimmed && !trimmed.startsWith(' ') && !trimmed.startsWith('\t'))) {
            inMultiline = false;
          }
        }
      }
      
      return { valid: true };
    } catch (e: unknown) {
      const error = e as Error;
      return { valid: false, error: error.message };
    }
  };

  const validateTOML = (text: string): ValidationResult => {
    try {
      const lines = text.split('\n');
      let inArray = false;
      let inMultilineString = false;
      let multilineDelimiter = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (trimmed.startsWith('#') || !trimmed) continue;
        
        if (trimmed.startsWith('[') && trimmed.endsWith(']') && !trimmed.startsWith('[[')) {
          const section = trimmed.slice(1, -1);
          if (!/^[\w.-]+$/.test(section)) {
            return { valid: false, error: `Invalid section name at line ${i + 1}`, line: i + 1 };
          }
          continue;
        }
        
        if (trimmed.startsWith('[[') && trimmed.endsWith(']]')) {
          continue;
        }
        
        if (trimmed.includes('=')) {
          const [key, ...valueParts] = trimmed.split('=');
          const keyTrimmed = key.trim();
          const value = valueParts.join('=').trim();
          
          if (!/^[\w.-]+$/.test(keyTrimmed)) {
            return { valid: false, error: `Invalid key at line ${i + 1}: ${keyTrimmed}`, line: i + 1 };
          }
          
          if (value.startsWith('"""') || value.startsWith("'''")) {
            inMultilineString = true;
            multilineDelimiter = value.startsWith('"""') ? '"""' : "'''";
            if (value.endsWith(multilineDelimiter) && value.length > multilineDelimiter.length) {
              inMultilineString = false;
            }
            continue;
          }
          
          if (inMultilineString) {
            if (trimmed.endsWith(multilineDelimiter)) {
              inMultilineString = false;
            }
            continue;
          }
          
          if (value.startsWith('[')) {
            inArray = true;
          }
          
          if (inArray) {
            if (value.endsWith(']')) {
              inArray = false;
            }
            continue;
          }
        }
      }
      
      return { valid: true };
    } catch (e: unknown) {
      const error = e as Error;
      return { valid: false, error: error.message };
    }
  };

  const checkSyntax = useCallback(() => {
    setIsChecking(true);
    
    setTimeout(() => {
      let validationResult: ValidationResult;
      
      switch (format) {
        case 'json':
          validationResult = validateJSON(input);
          break;
        case 'yaml':
          validationResult = validateYAML(input);
          break;
        case 'toml':
          validationResult = validateTOML(input);
          break;
      }
      
      setResult(validationResult);
      setIsChecking(false);
    }, 200);
  }, [input, format]);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
    } catch {
      // Ignore
    }
  };

  const formatYAML = () => {
    // Simple YAML formatting
    const lines = input.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return line;
      if (trimmed.includes(':') && !trimmed.startsWith(' ')) {
        return line;
      }
      return line;
    });
    setInput(lines.join('\n'));
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
  };

  const sampleData = {
    json: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^16.0.0"\n  }\n}',
    yaml: 'name: example\nversion: 1.0.0\ndependencies:\n  react: "^16.0.0"',
    toml: '[project]\nname = "example"\nversion = "1.0.0"\n\n[dependencies]\nreact = "^16.0.0"',
  };

  const loadSample = () => {
    setInput(sampleData[format]);
    setResult(null);
  };

  return (
    <main className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <Badge accent>VALIDATOR</Badge>
        </div>
        <Title level={1} className="mb-4">Syntax Checker</Title>
        <Text muted className="mb-8">Validate JSON, YAML and TOML syntax with error highlighting</Text>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          <div className="lg:col-span-3">
            <Box className="p-6">
              <div className="flex gap-4 mb-4">
                {(['json', 'yaml', 'toml'] as FormatType[]).map((fmt) => (
                  <Button
                    key={fmt}
                    onClick={() => { setFormat(fmt); setResult(null); }}
                    className={`uppercase ${format === fmt ? 'bg-accent text-white' : ''}`}
                  >
                    {fmt}
                  </Button>
                ))}
              </div>
              
              <textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setResult(null); }}
                placeholder={`Paste your ${format.toUpperCase()} here...`}
                className="w-full h-96 bg-bg-base border border-border text-text-body font-mono text-sm p-4 focus:outline-none focus:border-accent resize-none"
              />
              
              <div className="flex gap-4 mt-4">
                <Button onClick={checkSyntax} disabled={isChecking || !input}>
                  {isChecking ? 'Checking...' : 'Check Syntax'}
                </Button>
                <Button onClick={format === 'json' ? formatJSON : formatYAML} disabled={!input}>
                  Format
                </Button>
                <Button onClick={loadSample} disabled={isChecking}>
                  Load Sample
                </Button>
                <Button onClick={clearAll} disabled={!input}>
                  Clear
                </Button>
              </div>
            </Box>
          </div>

          <div className="lg:col-span-1">
            <Box className="p-6 h-full">
              <Text className="text-sm uppercase tracking-wide mb-4 block">Result</Text>
              {result === null ? (
                <Text muted className="text-sm">Run syntax check</Text>
              ) : result.valid ? (
                <div>
                  <Text accent className="text-sm font-sans">✓ Valid {format.toUpperCase()}</Text>
                </div>
              ) : (
                <div>
                  <Text className="text-sm text-red-400 mb-2">✗ Invalid syntax</Text>
                  {result.error && (
                    <Text className="text-xs font-mono bg-bg-base p-2 border border-border block">
                      {result.error}
                    </Text>
                  )}
                  {result.line && (
                    <Text muted className="text-xs mt-2 block">
                      Line: {result.line}{result.column ? `, Column: ${result.column}` : ''}
                    </Text>
                  )}
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
