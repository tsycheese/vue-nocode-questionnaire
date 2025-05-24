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
    setTextStatus,
    addOptionStatus,
    removeOptionStatus,
    setOptionsStatus,
    setPicLinkByIndex,
  },
});
