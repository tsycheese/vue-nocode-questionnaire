import type { ComStatus } from './common.ts';

export interface SurveyDBData {
  createDate: number;
  updateDate: number;
  title: string;
  surveyCount: number;
  coms: ComStatus[];
}
