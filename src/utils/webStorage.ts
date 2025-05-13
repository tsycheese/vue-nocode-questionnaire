// 当前激活的视图
export enum ActiveView {
  Materials = 'materials',
  Editor = 'editor',
}

export function getActiveView() {
  return localStorage.getItem('activeView');
}

export function setActiveView(view: string) {
  localStorage.setItem('activeView', view);
}
