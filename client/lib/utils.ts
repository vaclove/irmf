import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl(path: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  return `${apiUrl}${path}`;
}
