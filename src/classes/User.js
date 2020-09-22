import { getProp } from "@/helpers/functions/Class";

class User {
    constructor(user = null) {
        this._id = getProp(user, "_id");
        this.email = getProp(user, "email");
        this.createdAt = getProp(user, "createdAt");
        this.updatedAt = getProp(user, "updatedAt");
        this.logged = getProp(user, "logged");
    }
}

export default User;