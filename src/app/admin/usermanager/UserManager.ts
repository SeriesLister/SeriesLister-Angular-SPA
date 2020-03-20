export class UserManager {
    public email: string;
    public password: string;
    public rememberMe: boolean = false;

    constructor(email : string, password : string) {
        this.email = email;
        this.password = password;
    }
}