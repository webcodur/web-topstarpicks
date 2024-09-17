import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');
export const contentTypeNumberAtom = atomWithStorage('contentTypeNumber', null);
export const contentTypeAtom = atom('전체');
export const isAdminAtom = atom(false);
