import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const argon2 = require('argon2');
const crypto = require('crypto');

export async function POST(request: NextRequest) {
  try {
    const { text, type } = await request.json() as { text: string; type: string };

    if (!text || !type) {
      return NextResponse.json({ error: 'Missing text or type' }, { status: 400 });
    }

    let result: string;

    switch (type) {
      case 'MD5':
        result = crypto.createHash('md5').update(text).digest('hex');
        break;

      case 'SHA-1':
        result = crypto.createHash('sha1').update(text).digest('hex');
        break;

      case 'SHA-256':
        result = crypto.createHash('sha256').update(text).digest('hex');
        break;

      case 'SHA-512':
        result = crypto.createHash('sha512').update(text).digest('hex');
        break;

      case 'Base64':
        result = Buffer.from(text).toString('base64');
        break;

      case 'Base64URL':
        result = Buffer.from(text).toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
        break;

      case 'Argon2':
        try {
          result = await argon2.hash(text);
        } catch {
          return NextResponse.json({ error: 'Argon2 hashing failed' }, { status: 500 });
        }
        break;

      case 'Bcrypt':
        try {
          const salt = await bcrypt.genSalt(10);
          result = await bcrypt.hash(text, salt);
        } catch {
          return NextResponse.json({ error: 'Bcrypt hashing failed' }, { status: 500 });
        }
        break;

      default:
        return NextResponse.json({ error: 'Unsupported hash type' }, { status: 400 });
    }

    return NextResponse.json({ result, type });
  } catch (error) {
    console.error('Hash error:', error);
    return NextResponse.json({ error: 'Hashing failed' }, { status: 500 });
  }
}
