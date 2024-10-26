import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
export const darkModeAtom = atomWithStorage('darkMode', false);
export const languageAtom = atomWithStorage('language', 'ko');

export const contentNameAtom = atomWithStorage('contentNameAtom', '책');

export const professionNameAtom = atomWithStorage('professionNameAtom', null);
export const isAdminAtom = atom(false);
