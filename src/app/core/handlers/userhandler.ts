import { User } from '../../shared/models/User';

export class UserHandler {

    /**
     * The user object in memory
     */
    private user: User = null;

    /**
     * Tries to find the user in local storage
     * Returns true if found, or false if not found
     */
    public findUserFromLocal(): boolean {
        if (localStorage.getItem('currentUser') !== null) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            return true;
        }
        return false;
    }

    /**
     * Does the user currently exist
     * Returns a boolean based on user !== null
     */
    public isUserExisting(): boolean {
        return this.user !== null;
    }

    /**
     * Get's the user and returns user object
     */
    public getUser(): User {
        return this.user;
    }

    /**
     * Adds the user, and puts to local storage
     * @param user the user to add
     */
    public addUser(user: User): void {
        if (user == null) {
            return;
        }
        this.user = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    /**
     * Removes the user from localstorage and set to null
     */
    public removeUser(): void {
        localStorage.removeItem('currentUser');
        this.user = null;
    }

}