
export class JWTokenHandler {

    private refreshToken : string = "";

    private token : string = "";

    constructor(refreshToken : string = "", token : string = "") {
        this.refreshToken = refreshToken;
        this.token = token;
    }

    public hasToken() : boolean {
        return this.token.length > 0;
    }

    public hasRefreshToken() : boolean {
        return this.refreshToken.length > 0;
    }

    public getToken() : string {
        return this.token;
    }

    public getRefreshToken() : string {
        return this.refreshToken;
    }

    public setToken(token: string) : void {
        localStorage.setItem("token", this.getToken());
        this.token = token;
    }

    public setRefreshToken(refreshToken : string) : void {
        localStorage.setItem("refreshToken", this.getRefreshToken());
        this.refreshToken = refreshToken;
    }

    public retrieveTokenInternal() : JWTokenHandler {
        if (localStorage.getItem("token") && localStorage.getItem("refreshToken")) {
            return new JWTokenHandler(localStorage.getItem("refreshToken"), localStorage.getItem("token"));
        }
        return  new JWTokenHandler();
    }

    public clearTokens() : void {
        this.token = "";
        this.refreshToken = "";
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    }

    public storeTokensInternal() : void {
        if (!this.hasToken() && !this.getRefreshToken()) {
            return;
        }

        localStorage.setItem("token", this.getToken());
        localStorage.setItem("refreshToken", this.getRefreshToken());
    }

}