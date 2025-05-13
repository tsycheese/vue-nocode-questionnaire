// 组件市场里面所有组件状态的仓库
import { defineStore } from 'pinia';
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap';
import { addOptionStatus, removeOptionStatus, setTextStatus, setOptionsStatus } from './actions.ts';

export const useMaterialStore = defineStore('materialStore', {
  state: () => ({
    // 记录当前选中的业务组件
    currentMaterialCom: 'single-select',
    // 记录所有的业务组件
    coms: {
      'single-select': defaultStatusMap['single-select'](),
      'single-pic-select': defaultStatusMap['single-pic-select'](),
    },
  }),
  actions: {
    setTextStatus,
    addOptionStatus,
    removeOptionStatus,
    setOptionsStatus,
  },
});
