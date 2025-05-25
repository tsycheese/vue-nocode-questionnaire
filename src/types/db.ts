import type { ComStatus } from './common.ts';

export interface SurveyDBData {
  createDate: number;
  updateDate: number;
  title: string;
  surveyCount: number;
  coms: ComStatus[];
  id?: number; // 存储时不需要给出，取出时会自动添加
}
