import type { VueComType } from './common.ts';

// 基础属性
export interface BaseProps {
  id: string;
  isShow: boolean;
  name: string;
  editCom: VueComType;
}

// 选项 status 值的类型
export type StringStatusArr = string[];
export type ValueStatusArr = Array<{ value: string; status: string }>;
export type PicTitleDescStatusArr = Array<{
  picTitle: string;
  picDesc: string;
  value: string;
}>;

export type OptionsStatusArr = StringStatusArr | ValueStatusArr | PicTitleDescStatusArr;

export interface TextProps extends BaseProps {
  status: string;
}

export interface OptionsProps extends BaseProps {
  status: OptionsStatusArr;
  currentStatus: number; // 当前选中的索引
}

// ----------------------------------------

// 公共的设置项，每个业务组件都有的设置项
// 业务组件 -> 设置项 -> 编辑组件
export interface BaseStatus {
  title: TextProps;
  desc: TextProps;
  position: OptionsProps; // 文字对齐方式
  titleSize: OptionsProps;
  descSize: OptionsProps;
  titleWeight: OptionsProps;
  descWeight: OptionsProps;
  titleItalic: OptionsProps;
  descItalic: OptionsProps;
  titleColor: TextProps;
  descColor: TextProps;
}

// 因为不是所有业务组件都有 options 这个设置项，所以需要分开定义
export interface OptionsStatus extends BaseStatus {
  options: OptionsProps;
}

// 判断是否是字符串数组
export function isStringArr(status: OptionsStatusArr): status is StringStatusArr {
  return Array.isArray(status) && status.every((item) => typeof item === 'string');
}

// 确定 status 是 { value: string; status: string } 这种类型的数组
export function isValueStatusArr(status: OptionsStatusArr): status is ValueStatusArr {
  return (
    Array.isArray(status) &&
    typeof status[0] === 'object' &&
    'value' in status[0] &&
    'status' in status[0]
  );
}

// 确定 status 是 { picTitle: string; picDesc: string; value: string } 这种类型的数组
export function isPicTitleDescStatusArr(status: OptionsStatusArr): status is PicTitleDescStatusArr {
  return (
    Array.isArray(status) &&
    typeof status[0] === 'object' &&
    'picTitle' in status[0] &&
    'picDesc' in status[0] &&
    'value' in status[0]
  );
}

// 设置图片时会用到的类型，link 是图片的链接，index 是图片在 options 中的索引
export type PicLink = { link: string; index: number };
export function isPicLink(obj: object): obj is PicLink {
  return 'link' in obj && 'index' in obj;
}
