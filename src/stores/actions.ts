import type { TextProps } from '@/types/editProps.ts';

export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}
