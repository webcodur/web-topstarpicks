import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');
export const contentTypeAtom = atom('전체');
