import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');

// export const contentNameNumberAtom = atomWithStorage('contentNameNumber', null);

export const contentNameAtom = atomWithStorage('contentNameAtom', '전체');

export const professionNameAtom = atom('전체');
export const isAdminAtom = atom(false);
