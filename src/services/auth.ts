import jwt_decode from "jwt-decode"

export class AuthService {
    private static readonly TOKEN_KEY: string = '@questsapp'

    public static isAuthenticated(): Boolean {
        const token = localStorage.getItem(this.TOKEN_KEY)
        return token !== null; // TO DO
    }

    public static getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY)
    }

    public static storeToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token)
    }

    public static removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY)
    }

    public static decodeToken(): any {
        const token = this.getToken()
        return token ? jwt_decode(token) : undefined
    }
}
