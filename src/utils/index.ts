import type { TextProps, OptionsProps } from '@/types/index.ts';

export function getTextStatus(props: TextProps): string {
  return props.status;
}

export function getStringArrStatus(props: OptionsProps): string[] {
  return props.status as string[];
}

export function getCurrentStatus(props: OptionsProps): number {
  return props.currentStatus;
}

export function getStringStatusByCurrentStatus(props: OptionsProps): string {
  return props.status[props.currentStatus] as string;
}
