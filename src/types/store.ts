import type { TextProps } from 'element-plus';
import type { OptionProps } from 'element-plus/es/components/select/src/type.mjs';
import type { PicLink } from './editProps.ts';
import type { ComStatus } from './common.ts';

// 记录题目类型的数组
export const SurveyComNameArr = [
  'single-select',
  'single-pic-select',
  'personal-info-gender',
  'personal-info-education',
] as const;

// 题目类型
export type SurveyComName = (typeof SurveyComNameArr)[number];

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

export function isSurveyComName(name: string): name is SurveyComName {
  return SurveyComNameArr.includes(name as SurveyComName);
}

const PDFComs: Material[] = [
  'single-select',
  'single-pic-select',
  'personal-info-gender',
  'personal-info-education',
  'title-note',
];

export function canUsedForPDF(name: Material): boolean {
  return PDFComs.includes(name);
}

export type QuizData = {
  surveyCount: number;
  coms: ComStatus[];
};
