import AuthContract from "../contracts/AuthContract"
import UserProfileContract from "../contracts/UserProfileContract";

export enum LocalStorageKey {
    Token = 'token'
}


export class AuthHelper {
    token: string | null;
    user : UserProfileContract | null;

    constructor() {
        this.token = localStorage.getItem(LocalStorageKey.Token);
        this.user = null;
    }

    setUser(user : UserProfileContract) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    setAuth(auth: AuthContract) {
        if (auth) {
            localStorage.setItem(LocalStorageKey.Token, auth.token);
            this.token = auth.token;
        }
    }

    removeAuth() {
        localStorage.removeItem(LocalStorageKey.Token);
    }
}

const authHelper = new AuthHelper()
export default authHelper