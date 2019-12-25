
export class UserSingleton {
    private static instance: UserSingleton;
    private username:string

    private constructor() {

    }

    public static getInstance() {
        if (UserSingleton.instance) {
            return UserSingleton.instance;
        }
        UserSingleton.instance = new UserSingleton();
        return UserSingleton.instance;
    }

    public setUsername(name:string){
        this.username = name;
    }

    public getUsername(){
        return this.username;
    }
}