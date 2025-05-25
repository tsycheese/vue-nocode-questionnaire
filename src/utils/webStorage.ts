// 当前激活的视图
export enum ActiveView {
  Materials = 'materials',
  Editor = 'editor',
  Preview = 'preview',
}

export function getActiveView() {
  return localStorage.getItem('activeView');
}

export function setActiveView(view: ActiveView) {
  localStorage.setItem('activeView', view);
}
