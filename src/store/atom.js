import { atomWithStorage } from 'jotai/utils';

export const isLoggedInAtom = atomWithStorage('isLoggedIn', false);
