import { atom } from 'recoil';

export const MyRegisteredPatients = atom ({
    key: "regPatients",
    default: []
})

export const LoggedUser = atom ({
    key: "isLoggedIn",
    default: false
})

export const Token = atom ({
    key: "token",
    default: ''
})

  
