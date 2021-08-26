import { atom } from 'recoil';

export const MyRegisteredPatients = atom ({
    key: "regPatients",
    default: []
})