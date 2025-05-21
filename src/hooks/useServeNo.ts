import { computed } from 'vue';
import type { ComStatus } from '@/types/common.ts';
import { isServeComName } from '@/types/store.ts';

// 返回问卷题目序号的数组
export function useServeNo(coms: ComStatus[]) {
  return computed(() => {
    let questionNumber = 1;
    return coms.map((com) => {
      // 需要判断当前这个组件是不是问卷题目
      if (isServeComName(com.name)) {
        return questionNumber++;
      }
      return null;
    });
  });
}
// 最终形成的数组示例：[1, 2, null, 3, 4, null, 5]
