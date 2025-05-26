import type { ComStatus } from '@/types/common.ts';
import { defineStore } from 'pinia';
import {
  addOptionStatus,
  removeOptionStatus,
  setOptionsStatus,
  setPicLinkByIndex,
  setTextStatus,
} from './actions.ts';
import type { TypeStatus } from '@/types/editProps.ts';
import { isSurveyComName } from '@/types/store.ts';
import type { SurveyDBData } from '@/types/db.ts';
import { getSurveyById, saveSurvey, updateSurveyById } from '@/db/operation.ts';

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    currentComIndex: -1, // 当前选中的组件的索引，-1 表示没有选中任何组件
    surveyCount: 0, // 当前服务组件的数量
    coms: [] as ComStatus[],
  }),
  actions: {
    /**
     *  设置说明文字状态，['标题', '段落']
     */
    changeTextType(index: number) {
      const surveyCom = this.coms[this.currentComIndex];
      const status = this.coms[this.currentComIndex].status as TypeStatus;
      if (surveyCom.name === 'text-note' && status['type'].currentStatus !== index) {
        status['type'].currentStatus = index;
        // 改变标题和段落的显示状态
        for (const key in status) {
          if (key.startsWith('title') || key.startsWith('desc')) {
            // @ts-ignore
            status[key].isShow = !status[key].isShow;
          }
        }
      }
    },
    addCom(newCom: ComStatus) {
      this.coms.push(newCom);
      this.currentComIndex = -1;
      if (isSurveyComName(newCom.name)) this.surveyCount++;
    },
    setCurrentComIndex(index: number) {
      this.currentComIndex = index;
    },
    removeCom(index: number) {
      this.coms.splice(index, 1);
    },
    // 保存问卷数到数据库中
    async saveSurveyToDB(data: SurveyDBData) {
      return saveSurvey(data);
    },
    async getSurveyFromDB(id: number) {
      const survey = await getSurveyById(id);
      if (survey) {
        this.setStore(survey);
      }
    },
    // 更新问卷
    async updateSurveyToDB(id: number) {
      return await updateSurveyById(id, {
        updateDate: new Date().getTime(),
        surveyCount: this.surveyCount,
        coms: this.coms,
      });
    },
    // 还原问卷的仓库状态，其实就是根据传入的数据设置 coms、surveyCount、currentComIndex
    setStore(data?: SurveyDBData) {
      if (data) {
        this.coms = data.coms;
        this.surveyCount = data.surveyCount;
        this.currentComIndex = -1;
      } else {
        // 如果没有传入数据，就清空仓库状态
        this.coms = [];
        this.surveyCount = 0;
        this.currentComIndex = -1;
      }
    },
    setTextStatus,
    addOptionStatus,
    removeOptionStatus,
    setOptionsStatus,
    setPicLinkByIndex,
  },
});
