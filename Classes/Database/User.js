const Extension = require("../../Extensions/Extension.js");
const Storage = require("../SimpleStorage.js");

class User extends Extension {
    static get items() {
        return {
            trivia: 0
        };
    }

    g(item, def) {
        return this.get("guild", this.id, item, def);
    }

    s(item, value) {
        return this.set("guild", this.id, item, value);
    }

    get storage() {
        if (!this.Storage) this.Storage = new Storage(this.client, this.id, "user")
        else return this.Storage;
    }
}

for (let [item, def] of Object.entries(User.items)) {
    Object.defineProperty(User.prototype, item, {
        get: function() {
            return this.g(item, def);
        },
        set: function(val) {
            this.s(item, val);
        }
    });
}

module.exports = User;