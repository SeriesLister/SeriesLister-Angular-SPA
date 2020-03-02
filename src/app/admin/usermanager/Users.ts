export class User {

    id: number;
    email: string;
    displayName: string;
    permissions: string[];

    public constructor(id: number, email: string, displayName: string, permissions: string[]) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.permissions = permissions;
    }

}