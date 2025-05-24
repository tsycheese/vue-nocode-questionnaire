import type { SurveyDBData } from '@/types/db.ts';
import Dexie from 'dexie';

class SurveyDataBase extends Dexie {
  // 定义了一个名为 surveys 的表，表中的数据类型为 SurveyDBData，表的主键为 number 类型
  // 表的主键是自增的
  surveys!: Dexie.Table<SurveyDBData, number>;

  constructor() {
    super('SurveyDataBase');
    this.version(1).stores({
      surveys: '++id, createDate, updateDate, title, surveyCount, coms',
    });
  }
}

export const db = new SurveyDataBase();
