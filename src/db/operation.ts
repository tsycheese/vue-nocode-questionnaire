import { db } from './db.ts';
import type { SurveyDBData } from '@/types/db.ts';
import { restoreComType } from '@/utils/restore.ts';

export async function saveSurvey(survey: SurveyDBData) {
  // 由于 indexDB 存储的对象不能包含函数，所以需要将 coms 转换为 JSON 字符串
  // 转换的同时，包含的 type (vue 组件类型) 会丢失方法，后续取出需要还原
  // 存储后，会添加 id 字段
  const modifiedSurvey = {
    ...survey,
    coms: JSON.parse(JSON.stringify(survey.coms)) as any,
  };
  return await db.surveys.put(modifiedSurvey);
}

export async function getAllSurveys() {
  const surveys = await db.surveys.toArray();
  // 还原组件类型
  surveys.forEach((survey) => {
    for (let i = 0; i < survey.coms.length; i++) {
      survey.coms[i] = restoreComType(survey.coms[i]);
    }
  });
  return surveys;
}

export async function getSurveyById(id: number) {
  const survey = await db.surveys.get(id);
  if (survey) {
    for (let i = 0; i < survey.coms.length; i++) {
      survey.coms[i] = restoreComType(survey.coms[i]);
    }
  }
  return survey;
}

export async function deleteSurveyById(id: number) {
  return await db.surveys.delete(id);
}

export async function updateSurveyById(id: number, survey: Partial<SurveyDBData>) {
  // 由于 indexDB 存储的对象不能包含函数，所以需要将 coms 转换为 JSON 字符串
  // 转换的同时，包含的 type (vue 组件类型) 会丢失方法，后续取出需要还原
  // 修改后，会添加 id 字段
  const modifiedSurvey = {
    ...survey,
    coms: JSON.parse(JSON.stringify(survey.coms)) as any,
  };
  return await db.surveys.update(id, modifiedSurvey);
}
