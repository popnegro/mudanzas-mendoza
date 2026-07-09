import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SitemapService } from '../src/services/sitemapService';

dotenv.config();

let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      throw new Error('GEMINI_API_KEY environment variable is missing or placeholder.');
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

export async function getRequestBody(req: any) {
  if (req.body) {
    return req.body;
  }

  const contentType = req.headers['content-type'] || req.headers['Content-Type'];
  if (req.method === 'POST' && contentType && contentType.includes('application/json')) {
    return await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        if (!body) {
          return resolve({});
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
      req.on('error', reject);
    });
  }

  return {};
}

export { SitemapService };
