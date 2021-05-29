import jwt_decode from "jwt-decode"
import cookie from 'react-cookies'

export class AuthService {
    private static readonly TOKEN_KEY: string = 'questsapp'

    public static isAuthenticated(): boolean {
        const token = this.getToken()
        return !!token // TO DO
    }

    public static getToken(): string {
        const token = cookie.load(this.TOKEN_KEY)
        return token
    }

    public static storeToken(token: string): void {
        const options = {
            path: '/'
        }

        cookie.save(this.TOKEN_KEY, token, options)
    }

    public static removeToken(): void {
        cookie.remove(this.TOKEN_KEY)
    }

    public static decodeToken(): any {
        const token = this.getToken()
        return token ? jwt_decode(token) : undefined
    }
}
