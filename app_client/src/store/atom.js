import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

// 서비스 로직
export const professionNameAtom = atom('전체');
export const contentNameAtom = atom('책');
export const menuInfoAtom = atomWithStorage('menuInfo', '추천정보');

// 시스템 자원
export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');

// 현재 미사용
export const isAdminAtom = atom(false);
export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
