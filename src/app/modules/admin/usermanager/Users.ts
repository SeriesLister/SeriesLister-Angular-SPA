export class UserManage {

    id : string;
    email: string;
    displayName: string;
    permissions: string[];

    public constructor(id : string, email: string, displayName: string, permissions: string[]) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
        this.permissions = permissions;
    }

}