// 配置单选题 SinglePicSelect 和编辑组件的映射关系（EditorStateSchema）
// 单选题（业务组件） ---> 编辑组件有哪些

import SinglePicSelect from '@/components/ServeComs/Materials/SelectComs/SinglePicSelect.vue';

import TitleEditor from '@/components/ServeComs/Materials/EditItems/TitleEditor.vue';
import DescEditor from '@/components/ServeComs/Materials/EditItems/DescEditor.vue';
import PicOptionsEditor from '@/components/ServeComs/Materials/EditItems/PicOptionsEditor.vue';
import PositionEditor from '@/components/ServeComs/Materials/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/ServeComs/Materials/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/ServeComs/Materials/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/ServeComs/Materials/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/ServeComs/Materials/EditItems/ColorEditor.vue';
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { ComStatus } from '@/types/common.ts';

export default function () {
  return {
    type: markRaw(SinglePicSelect),
    name: 'single-pic-select',
    id: uuidv4(),
    // 组件的状态：组件的每一个能够修改的状态都应该对应一个编辑组件；
    //            状态 --> 编辑组件（状态和编辑组件是一一对应的）
    status: {
      title: {
        id: uuidv4(),
        status: '默认图片单选题标题内容',
        isShow: true,
        name: 'title-editor',
        editCom: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '默认图片单选题描述内容',
        isShow: true,
        name: 'desc-editor',
        editCom: markRaw(DescEditor),
      },
      // 选项
      options: {
        id: uuidv4(),
        status: [
          {
            picTitle: '图片标题1',
            picDesc: '图片描述1',
            value: '',
          },
          {
            picTitle: '图片标题2',
            picDesc: '图片描述2',
            value: '',
          },
        ],
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
        editCom: markRaw(PicOptionsEditor),
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
        status: ['22', '20', '18'],
        currentStatus: 0,
        isShow: true,
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
        isShow: true,
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
        isShow: true,
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
        isShow: true,
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
