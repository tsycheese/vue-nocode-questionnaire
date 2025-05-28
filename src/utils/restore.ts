import type { ComStatus } from '@/types/common.ts';
import { componentMap } from '@/configs/componentMap.ts';

// 还原组件类型
export const restoreComType = (com: ComStatus): ComStatus => {
  const status = com.status;
  for (const optionKey in status) {
    const option = status[optionKey as keyof typeof status];
    option.editCom = componentMap[option.name as keyof typeof componentMap];
  }
  return {
    ...com,
    type: componentMap[com.name as keyof typeof componentMap],
  };
};
