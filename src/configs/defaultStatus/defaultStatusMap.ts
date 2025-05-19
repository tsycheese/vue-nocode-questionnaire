// 该文件用于定义默认状态的映射表
import singleSelectDefaultStatus from './SingleSelect';
import singlePicSelectDefaultStatus from './SinglePicSelect';
import textNoteDefaultStatus from './TextNote';

export const defaultStatusMap = {
  'single-select': singleSelectDefaultStatus,
  'single-pic-select': singlePicSelectDefaultStatus,
  'text-note': textNoteDefaultStatus,
  'personal-info-gender': singleSelectDefaultStatus,
  'personal-info-education': singleSelectDefaultStatus,
};
