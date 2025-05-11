import { isStringArr, type OptionsProps, type TextProps } from '@/types/editProps.ts';

export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}

export function addOptionStatus(optionsProps: OptionsProps) {
  if (isStringArr(optionsProps.status)) {
    optionsProps.status.push('新选项');
  }
}

export function removeOptionStatus(optionsProps: OptionsProps, index: number) {
  if (isStringArr(optionsProps.status)) {
    optionsProps.status.splice(index, 1);
  }
}
