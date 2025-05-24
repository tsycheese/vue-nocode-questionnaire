import { db } from './db.ts';
import type { SurveyDBData } from '@/types/db.ts';

export async function saveSurvey(survey: SurveyDBData) {
  const modifiedSurvey = {
    ...survey,
    coms: JSON.parse(JSON.stringify(survey.coms)) as any,
  };
  return await db.surveys.put(modifiedSurvey);
}

export async function getAllSurveys() {
  return await db.surveys.toArray();
}

export async function getSurveyById(id: number) {
  return await db.surveys.get(id);
}

export async function deleteSurveyById(id: number) {
  return await db.surveys.delete(id);
}

export async function updateSurveyById(id: number, survey: Partial<SurveyDBData>) {
  return await db.surveys.update(id, survey);
}
