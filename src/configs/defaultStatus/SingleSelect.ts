// 配置单选题 SingleSelect 和编辑组件的映射关系（EditorStateSchema）
// 单选题（业务组件） ---> 编辑组件有哪些

import SingleSelect from '@/components/ServeComs/Materials/SelectComs/SingleSelect.vue';

import TitleEditor from '@/components/ServeComs/Materials/EditItems/TitleEditor.vue';
import DescEditor from '@/components/ServeComs/Materials/EditItems/DescEditor.vue';
import OptionsEditor from '@/components/ServeComs/Materials/EditItems/OptionsEditor.vue';
import PositionEditor from '@/components/ServeComs/Materials/EditItems/PositionEditor.vue';
import SizeEditor from '@/components/ServeComs/Materials/EditItems/SizeEditor.vue';
import WeightEditor from '@/components/ServeComs/Materials/EditItems/WeightEditor.vue';
import ItalicEditor from '@/components/ServeComs/Materials/EditItems/ItalicEditor.vue';
import ColorEditor from '@/components/ServeComs/Materials/EditItems/ColorEditor.vue';
import { markRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default function () {
  return {
    type: markRaw(SingleSelect),
    name: 'single-select',
    id: uuidv4(),
    // 组件的状态：组件的每一个能够修改的状态都应该对应一个编辑组件；
    //            状态 --> 编辑组件（状态和编辑组件是一一对应的）
    status: {
      title: {
        id: uuidv4(),
        status: '单选题默认标题',
        isShow: true,
        name: 'title-editor',
        editor: markRaw(TitleEditor),
      },
      desc: {
        id: uuidv4(),
        status: '单选题默认描述',
        isShow: true,
        name: 'desc-editor',
        editor: markRaw(DescEditor),
      },
      // 选项
      options: {
        id: uuidv4(),
        status: ['默认选项1', '默认选项2', '默认选项3'],
        currentStatus: 0,
        isShow: true,
        name: 'options-editor',
        editor: markRaw(OptionsEditor),
      },

      // 对齐方式
      position: {
        id: uuidv4(),
        status: ['左对齐', '居中对齐'],
        currentStatus: 0,
        isShow: true,
        name: 'position-editor',
        editor: markRaw(PositionEditor),
      },
      titleSize: {
        id: uuidv4(),
        status: ['22', '20', '18'],
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editor: markRaw(SizeEditor),
      },
      descSize: {
        id: uuidv4(),
        status: ['16', '14', '12'],
        currentStatus: 0,
        isShow: true,
        name: 'size-editor',
        editor: markRaw(SizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editor: markRaw(WeightEditor),
      },
      descWeight: {
        id: uuidv4(),
        status: ['加粗', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'weight-editor',
        editor: markRaw(WeightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        status: ['斜体', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editor: markRaw(ItalicEditor),
      },
      descItalic: {
        id: uuidv4(),
        status: ['斜体', '正常'],
        currentStatus: 1,
        isShow: true,
        name: 'italic-editor',
        editor: markRaw(ItalicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: '#000',
        isShow: true,
        name: 'color-editor',
        editor: markRaw(ColorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: '#909399',
        isShow: true,
        name: 'color-editor',
        editor: markRaw(ColorEditor),
      },
    },
  };
}
