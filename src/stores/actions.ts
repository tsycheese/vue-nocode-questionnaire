import {
  isPicTitleDescStatusArr,
  isStringArr,
  type OptionsProps,
  type PicLink,
  type TextProps,
} from '@/types/editProps.ts';

export function setTextStatus(textProps: TextProps, text: string) {
  textProps.status = text;
}

export function addOptionStatus(optionsProps: OptionsProps) {
  if (isStringArr(optionsProps.status)) {
    optionsProps.status.push('新选项');
  }
}

export function removeOptionStatus(optionsProps: OptionsProps, index: number) {
  // 至少保留两个选项
  if (optionsProps.status.length <= 2) {
    return false;
  }
  if (isStringArr(optionsProps.status)) {
    optionsProps.status.splice(index, 1);
    return true;
  }
  return false;
}

export function setOptionsStatus(optionsProps: OptionsProps, index: number) {
  if (isStringArr(optionsProps.status)) {
    optionsProps.currentStatus = index;
  }
}

export function setPicLinkByIndex(optionsProps: OptionsProps, payload: PicLink) {
  console.log('optionsProps', optionsProps);
  console.log('payload', payload);
  if (isPicTitleDescStatusArr(optionsProps.status)) {
    // 只适用于开发环境
    optionsProps.status[payload.index].value = 'http://localhost:3001' + payload.link;
  }
}
