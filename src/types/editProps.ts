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

export interface TextProps extends BaseProps {
  status: string;
}

export interface OptionsProps extends BaseProps {
  status: StringStatusArr | ValueStatusArr | PicTitleDescStatusArr;
  currentStatus: number; // 当前选中的索引
}

// ----------------------------------------

// 公共的设置项，每个编辑组件都有的设置项
// 编辑组件 -> 设置项 -> 设置组件
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
