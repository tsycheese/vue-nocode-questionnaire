import { createRouter, createWebHistory } from 'vue-router';
import { useMaterialStore } from '@/stores/materialStore.ts';
import { getActiveView } from '@/utils/webStorage.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView/index.vue'),
      redirect: '/editor/survey-type',
      children: [
        {
          path: '/editor/survey-type',
          name: 'survey-type',
          component: () => import('@/views/EditorView/LeftSide/SurveyTypeView.vue'),
        },
        {
          path: '/editor/outline',
          name: 'outline',
          component: () => import('@/views/EditorView/LeftSide/OutlineView.vue'),
        },
      ],
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/index.vue'),
      redirect: '/select-group',
      children: [
        {
          path: '/select-group',
          name: 'select-group',
          component: () => import('@/views/MaterialsView/Groups/SelectGroupView.vue'),
          redirect: '/single-select',
          children: [
            {
              path: '/single-select',
              name: 'single-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/multi-select',
              name: 'multi-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiSelect.vue'),
            },
            {
              path: '/option-select',
              name: 'option-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/OptionSelect.vue'),
            },
            {
              path: '/single-pic-select',
              name: 'single-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SinglePicSelect.vue'),
            },
            {
              path: '/multi-pic-select',
              name: 'multi-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiPicSelect.vue'),
            },
          ],
        },
        {
          path: '/input-group',
          name: 'input-group',
          component: () => import('@/views/MaterialsView/Groups/InputGroupView.vue'),
        },
        {
          path: '/advanced-group',
          name: 'advanced-group',
          component: () => import('@/views/MaterialsView/Groups/AdvancedGroupView.vue'),
        },
        {
          path: '/note-group',
          name: 'note-group',
          component: () => import('@/views/MaterialsView/Groups/NoteGroupView.vue'),
          redirect: '/text-note',
          children: [
            {
              path: '/text-note',
              name: 'text-note',
              component: () => import('@/components/SurveyComs/Materials/NoteComs/TextNote.vue'),
            },
          ],
        },
        {
          path: '/personal-info-group',
          name: 'personal-info-group',
          component: () => import('@/views/MaterialsView/Groups/PersonalInfoGroupView.vue'),
          redirect: '/personal-info-gender',
          children: [
            {
              path: '/personal-info-gender',
              name: 'personal-info-gender',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-education',
              name: 'personal-info-education',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
          ],
        },
        {
          path: '/contact-group',
          name: 'contact-group',
          component: () => import('@/views/MaterialsView/Groups/ContactGroupView.vue'),
        },
      ],
    },
    {
      path: '/preview/:id(\\d+)',
      name: 'preview',
      component: () => import('@/views/PreviewView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置之前需要判断一下是否是组件市场
  // 因为只有组件市场需要记录当前的组件
  const activeView = getActiveView();
  const store = useMaterialStore();
  if (activeView === 'materials' && to.name) {
    // 路由名称和对应的业务组件名称一致
    store.setCurrentMaterialCom(to.name as string);
  }
  next();
});

export default router;
