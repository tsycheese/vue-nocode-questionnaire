import { educationStatus, genderStatus } from '@/configs/defaultStatus/initStatus.ts';
import {
  type TextProps,
  type OptionsProps,
  type PicTitleDescStatusArr,
  isOptionsStatus,
  type ComStatus,
  type TypeStatus,
} from '@/types/index.ts';
import type { Material } from '@/types/store.ts';

export function getTextStatus(props: TextProps): string {
  return props.status;
}

export function getStringArrStatus(props: OptionsProps): string[] {
  return props?.status as string[];
}

export function getCurrentStatus(props: OptionsProps): number {
  return props?.currentStatus;
}

export function getStringStatusByCurrentStatus(props: OptionsProps): string {
  return props.status[props.currentStatus] as string;
}

export function getPicTitleDescStatusArr(props: OptionsProps): PicTitleDescStatusArr {
  return props?.status as PicTitleDescStatusArr;
}

export function updateInitStatusBeforeAdd(comStatus: ComStatus, newMaterialName: Material) {
  switch (newMaterialName) {
    case 'personal-info-gender': {
      comStatus.name = 'personal-info-gender';
      comStatus.status.title.status = '您的性别是？';
      if (isOptionsStatus(comStatus.status)) comStatus.status.options.status = genderStatus();
      break;
    }
    case 'personal-info-education': {
      comStatus.name = 'personal-info-education';
      comStatus.status.title.status = '到目前为止，您的最高学历是？';
      if (isOptionsStatus(comStatus.status)) comStatus.status.options.status = educationStatus();
      break;
    }
  }
}
