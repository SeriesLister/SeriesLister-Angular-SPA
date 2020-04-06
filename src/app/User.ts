export class User {

    public token: string;

    public email: string;

    public userName: string;

    constructor(token: string, email: string, userName: string) {
        this.token = token;
        this.email = email;
        this.userName = userName; 
    }

    public getToken() : string {
        return this.token;
    }
    
}