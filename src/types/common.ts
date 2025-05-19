import type { defineComponent } from 'vue';
import type { OptionsStatus, TypeStatus } from './editProps.ts';

// 导出 vue 组件类型
export type VueComType = ReturnType<typeof defineComponent>;

// 导出业务组件状态类型
export interface ComStatus {
  type: VueComType;
  name: string;
  id: string;
  status: OptionsStatus | TypeStatus;
}
