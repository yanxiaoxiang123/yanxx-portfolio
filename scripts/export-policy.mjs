import path from 'node:path';

const allowedExtensions = new Set(['.html', '.txt', '.js', '.css', '.json', '.svg', '.webp', '.avif', '.woff2', '.ico']);
const blockedSegments = new Set(['docs', '简历', '照片', 'private', 'source']);

/** Only these files may reach the published static export. */
export function isAllowedExportFile(relativePath) {
  if (!relativePath) return false;
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.includes('..') || normalized.startsWith('/')) return false;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.some(segment => segment.startsWith('.') || blockedSegments.has(segment))) return false;
  return allowedExtensions.has(path.extname(normalized).toLowerCase());
}
