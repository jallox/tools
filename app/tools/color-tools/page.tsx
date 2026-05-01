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

interface ColorData {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
  hsv: { h: number; s: number; v: number };
}

export default function ColorToolsPage() {
  const [hex, setHex] = useState('#5b6af0');
  const [colorData, setColorData] = useState<ColorData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [red, setRed] = useState(91);
  const [green, setGreen] = useState(106);
  const [blue, setBlue] = useState(240);

  const hexToRgb = (hexVal: string) => {
    const cleaned = hexVal.replace('#', '');
    const fullHex = cleaned.length === 3
      ? cleaned.split('').map(c => c + c).join('')
      : cleaned;
    return {
      r: parseInt(fullHex.substring(0, 2), 16),
      g: parseInt(fullHex.substring(2, 4), 16),
      b: parseInt(fullHex.substring(4, 6), 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((1 - r - k) / (1 - k)) * 100),
      m: Math.round(((1 - g - k) / (1 - k)) * 100),
      y: Math.round(((1 - b - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = max === 0 ? 0 : (max - min) / max, v = max;

    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  };

  const updateColor = useCallback((newHex: string) => {
    const sanitized = newHex.startsWith('#') ? newHex : '#' + newHex;
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(newHex)) {
      setHex(sanitized);
      const rgb = hexToRgb(sanitized);
      setRed(rgb.r);
      setGreen(rgb.g);
      setBlue(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setColorData({ hex: sanitized, rgb, hsl, cmyk, hsv });
    }
  }, []);

  const updateFromRgb = useCallback(() => {
    const newHex = rgbToHex(red, green, blue);
    setHex(newHex);
    const rgb = { r: red, g: green, b: blue };
    const hsl = rgbToHsl(red, green, blue);
    const cmyk = rgbToCmyk(red, green, blue);
    const hsv = rgbToHsv(red, green, blue);
    setColorData({ hex: newHex, rgb, hsl, cmyk, hsv });
  }, [red, green, blue]);

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateRandom = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setRed(r);
    setGreen(g);
    setBlue(b);
    updateFromRgb();
  };

  useEffect(() => {
    updateColor(hex);
  }, []);

  return (
    <main className="min-h-screen py-12">
      <Container>
        <div className="mb-8">
          <Badge accent>DESIGN</Badge>
        </div>
        <Title level={1} className="mb-4">Color Tools</Title>
        <Text muted className="mb-8">Pick colors and convert between HEX, RGB, HSL, CMYK, HSV formats</Text>
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Color Picker</Text>

              <input
                type="color"
                value={hex}
                onChange={(e) => updateColor(e.target.value)}
                className="w-full h-32 border border-border cursor-pointer bg-transparent p-0"
              />

              <div className="mt-6 space-y-4">
                <div>
                  <Text className="text-xs uppercase tracking-wide mb-2 block">HEX</Text>
                  <Input
                    value={hex}
                    onChange={(v) => updateColor(v)}
                    className="w-full font-mono"
                  />
                </div>

                <div>
                  <Text className="text-xs uppercase tracking-wide mb-2 block">RGB</Text>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'R', value: red, setter: setRed },
                      { label: 'G', value: green, setter: setGreen },
                      { label: 'B', value: blue, setter: setBlue },
                    ].map(({ label, value, setter }) => (
                      <div key={label}>
                        <Text className="text-xs mb-1 block">{label}</Text>
                        <Input
                          type="number"
                          value={value.toString()}
                          onChange={(v) => setter(Math.min(255, Math.max(0, parseInt(v) || 0)))}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                  <Button onClick={updateFromRgb} className="w-full mt-3 text-xs py-2">
                    Update from RGB
                  </Button>
                </div>

                <Button onClick={generateRandom} className="w-full bg-bg-surface border-border">
                  Random Color
                </Button>
              </div>
            </Box>
          </div>

          <div className="lg:col-span-2">
            <Box className="p-6">
              <Text className="text-sm uppercase tracking-wide mb-6 block">Conversions</Text>

              {colorData && (
                <div className="space-y-4">
                  {[
                    { label: 'HEX', value: colorData.hex },
                    { label: 'RGB', value: `rgb(${colorData.rgb.r}, ${colorData.rgb.g}, ${colorData.rgb.b})` },
                    { label: 'HSL', value: `hsl(${colorData.hsl.h}, ${colorData.hsl.s}%, ${colorData.hsl.l}%)` },
                    { label: 'CMYK', value: `cmyk(${colorData.cmyk.c}%, ${colorData.cmyk.m}%, ${colorData.cmyk.y}%, ${colorData.cmyk.k}%)` },
                    { label: 'HSV', value: `hsv(${colorData.hsv.h}, ${colorData.hsv.s}%, ${colorData.hsv.v}%)` },
                  ].map(({ label, value }) => (
                    <div key={label} className="border border-border p-4 bg-bg-base hover:border-accent transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <Text className="text-xs uppercase tracking-wider text-accent w-12">{label}</Text>
                          <code className="font-mono text-sm flex-1">{value}</code>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(value, label)}
                          className="px-3 py-1 text-xs"
                        >
                          {copied === label ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 border border-border p-4 bg-bg-base">
                    <Text className="text-xs uppercase tracking-wider text-accent mb-3 block">Preview</Text>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="h-24 border border-border flex items-center justify-center"
                        style={{ backgroundColor: colorData.hex }}
                      >
                        <span className="text-xs font-mono" style={{ color: colorData.hsl.l > 50 ? '#000' : '#fff' }}>
                          {colorData.hex}
                        </span>
                      </div>
                      <div
                        className="h-24 border border-border flex items-center justify-center"
                        style={{ backgroundColor: colorData.hex, opacity: 0.5 }}
                      >
                        <span className="text-xs font-mono" style={{ color: colorData.hsl.l > 50 ? '#000' : '#fff' }}>
                          50% Opacity
                        </span>
                      </div>
                    </div>
                  </div>
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