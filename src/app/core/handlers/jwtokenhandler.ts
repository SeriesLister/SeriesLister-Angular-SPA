
export class JWTokenHandler {

    /**
     * The refresh token
     */
    private refreshToken : string = "";

    /**
     * The jwtoken
     */
    private token : string = "";

    /**
     * The constructor to create the class
     * @param refreshToken The refresh token
     * @param token The jwtoken
     */
    constructor(refreshToken : string = "", token : string = "") {
        this.refreshToken = refreshToken;
        this.token = token;
    }

    /**
     * Checks if we have a ticket returns boolean
     */
    public hasToken() : boolean {
        return this.token.length > 0;
    }

    /**
     * Checks if we have the refresh Token returns boolean
     */
    public hasRefreshToken() : boolean {
        return this.refreshToken.length > 0;
    }

    /**
     * The token to get returns as string
     */
    public getToken() : string {
        return this.token;
    }

    /**
     * The refresh token to get returns as string
     */
    public getRefreshToken() : string {
        return this.refreshToken;
    }

    /**
     * Used to set tokens internally and in class
     * @param token 
     * @param refreshToken 
     */
    public setTokens(token: string, refreshToken: string): void {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.token = token;
        this.refreshToken = refreshToken;
    }

    /**
     * Retrieves the tokens from lcoalstorage
     */
    public retrieveTokensInternal() : JWTokenHandler {
        if (localStorage.getItem("token") && localStorage.getItem("refreshToken")) {
            return new JWTokenHandler(localStorage.getItem("refreshToken"), localStorage.getItem("token"));
        }
        return  new JWTokenHandler();
    }

    /**
     * Clears the tokens completely from local and class
     */
    public clearTokens() : void {
        this.token = "";
        this.refreshToken = "";
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    }

}