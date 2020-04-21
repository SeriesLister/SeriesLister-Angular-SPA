
export class JWTokens {

    private refreshToken : string = "";

    public token : string = "";

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

    public retrieveTokenInternal() : JWTokens {
        if (localStorage.getItem("token") && localStorage.getItem("refreshToken")) {
            console.debug("tokens are found!");
            return new JWTokens(localStorage.getItem("refreshToken"), localStorage.getItem("token"));
        }
        return  new JWTokens();
    }

    public clearTokens() : void {
        this.token = "";
        this.refreshToken = "";
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    }

    public storeTokensInternal() : void {
        if (!this.hasToken() && !this.getRefreshToken()) {
            console.debug("Tokens can't be added to internal storage");
            return;
        }

        localStorage.setItem("token", this.getToken());
        localStorage.setItem("refreshToken", this.getRefreshToken());
    }

}