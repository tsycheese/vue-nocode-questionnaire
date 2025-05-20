// 组件市场里面所有组件状态的仓库
import { defineStore } from 'pinia';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import {
  addOptionStatus,
  removeOptionStatus,
  setTextStatus,
  setOptionsStatus,
  setPicLinkByIndex,
} from './actions.ts';
import type { Material } from '@/types/store.ts';
import type { ComStatus } from '@/types/common.ts';
import { updateInitStatusBeforeAdd } from '@/utils/index.ts';

// 哪些业务组件需要初始化
const keyToInit = ['personal-info-gender', 'personal-info-education'] as Material[];

const initializedStates: { [key: string]: ComStatus } = {};

keyToInit.forEach((key) => {
  // @ts-ignore
  const defaultStatus = defaultStatusMap[key]() as ComStatus;
  updateInitStatusBeforeAdd(defaultStatus, key);
  initializedStates[key] = defaultStatus;
});

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    // 记录当前选中的业务组件
    currentMaterialCom: 'single-select',
    // 记录所有的业务组件
    coms: {
      'single-select': defaultStatusMap['single-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
      'text-note': defaultStatusMap['text-note'](),
      'personal-info-gender': initializedStates['personal-info-gender'],
      'personal-info-education': initializedStates['personal-info-education'],
    },
  }),
  actions: {
    // 设置当前选中的组件
    setCurrentMaterialCom(com: string) {
      this.currentMaterialCom = com;
    },
    /**
     *  设置说明文字状态，['标题', '段落']
     */
    changeTextType(index: number) {
      // @ts-ignore
      const status = this.coms[this.currentMaterialCom].status;
      if (this.currentMaterialCom === 'text-note' && status['type'].currentStatus !== index) {
        status['type'].currentStatus = index;
        // 改变标题和段落的显示状态
        for (const key in status) {
          if (key.startsWith('title') || key.startsWith('desc')) {
            status[key].isShow = !status[key].isShow;
          }
        }
      }
    },
    setTextStatus,
    addOptionStatus,
    removeOptionStatus,
    setOptionsStatus,
    setPicLinkByIndex,
  },
});
