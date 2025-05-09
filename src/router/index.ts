import { createRouter, createWebHistory } from 'vue-router';

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
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/index.vue'),
      redirect: '/materials/select-group',
      children: [
        {
          path: '/select-group',
          name: 'select-group',
          component: () => import('@/views/MaterialsView/Groups/SelectGroupView.vue'),
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
        },
        {
          path: '/personal-info-group',
          name: 'personal-info-group',
          component: () => import('@/views/MaterialsView/Groups/PersonalInfoGroupView.vue'),
        },
        {
          path: '/contact-group',
          name: 'contact-group',
          component: () => import('@/views/MaterialsView/Groups/ContactGroupView.vue'),
        },
      ],
    },
  ],
});

export default router;
