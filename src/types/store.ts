import type { TextProps } from 'element-plus';
import type { OptionProps } from 'element-plus/es/components/select/src/type.mjs';
import type { PicLink } from './editProps.ts';
import type { ComStatus } from './common.ts';

// 题目类型
export type SurveyComName =
  | 'single-select'
  | 'single-pic-select'
  | 'personal-info-gender'
  | 'personal-info-education';

// 业务组件类型（题目类型 + 非题目类型）
export type Material = SurveyComName | 'title-note';

export interface Actions {
  setTextStatus: (textProps: TextProps, text: string) => void;
  addOption: (optionProps: OptionProps) => void;
  removeOption: (optionProps: OptionProps, index: number) => void;
  setPosition: (optionProps: OptionProps, index: number) => void;
  setCurrentStatus: (optionProps: OptionProps, index: number) => void;
  setPicLinkByIndex: (optionProps: OptionProps, payload: PicLink) => void;
}

// 仓库状态
export interface MaterialStore extends Actions {
  currentMaterialCom: Material;
  coms: Record<Material, ComStatus>;
  setCurrentMaterialCom: (material: Material) => void;
}
