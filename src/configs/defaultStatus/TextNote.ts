// 配置单选题 SingleSelect 和编辑组件的映射关系（EditorStateSchema）
// 单选题（业务组件） ---> 编辑组件有哪些

import TextNote from '@/components/SurveyComs/Materials/NoteComs/TextNote.vue';

import TitleEditor from '@/components/SurveyComs/EditItems/TitleEditor.vue';
import DescEditor from '@/components/SurveyComs/EditItems/DescEditor.vue';
import TextTypeEditor from '@/components/SurveyComs/EditItems/TextTypeEditor.vue';
import PositionEditor from '@/components/SurveyComs/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/SurveyComs/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/SurveyComs/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/SurveyComs/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/SurveyComs/EditItems/ColorEditor.vue';
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { ComStatus } from '@/types/common.ts';

export default function () {
  return {
    type: markRaw(TextNote),
    name: 'text-note',
    id: uuidv4(),
    // 组件的状态：组件的每一个能够修改的状态都应该对应一个编辑组件；
    //            状态 --> 编辑组件（状态和编辑组件是一一对应的）
    status: {
      // 多一个type编辑项
      type: {
        id: uuidv4(),
        status: ['标题', '段落'],
        currentStatus: 1,
        isShow: true,
        name: 'text-type-editor',
        editCom: markRaw(TextTypeEditor),
      },

      title: {
        id: uuidv4(),
        status: '单选题默认标题',
        isShow: false,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '单选题默认描述',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },

      // 对齐方式
      position: {
        id: uuidv4(),
        status: ['左对齐', '居中对齐'],
        currentStatus: 0,
        isShow: true,
        name: 'position-editor',
        editCom: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidv4(),
        status: ['26', '24', '22'],
        currentStatus: 0,
        isShow: false,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidv4(),
        status: ['16', '14', '12'],
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editCom: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: false,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editCom: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        status: ['斜体', '正常'],
        currentStatus: 1,
        isShow: false,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidv4(),
        status: ['斜体', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editCom: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: false,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        name: 'color-editor',
        editCom: markRaw(ColorEditor),
      },
    },
  } as ComStatus;
}
