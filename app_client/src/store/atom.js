import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

// 필터링
export const professionNameAtom = atom('전체'); // 전체, 작가, 배우, ...
export const contentNameAtom = atom('책'); // 책, 영화, ...
export const timesNameAtom = atom('전체인물'); // 전체인물, 역사인물, 현대인물

// 현재 미사용
export const isAdminAtom = atom(false);
export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);

export const profDataLoadedAtom = atom(false);

export const isSidebarOpenAtom = atom(false);
export const isAppBarOpenAtom = atom(false);

// 로컬스토리지 활용

export const viewTypeAtom = atomWithStorage('viewType', 'grid');
export const menuInfoAtom = atomWithStorage('menuInfo', '홈');

export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');
