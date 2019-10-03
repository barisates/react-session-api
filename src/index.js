const Config = {
    useBrowserStorage: false,
    timeout: 0,
    recentAccess: new Date(),
    expired: () => {
        const expireMinute = Math.round((((new Date() - Config.recentAccess) % 86400000) % 3600000) / 60000);

        if (expireMinute > Config.timeout && Config.timeout !== 0) {
            console.warn("Session expired!");
            return true;
        }
        return false;
    }
}

const Storage = () => {
    try {
        if (!Config.useBrowserStorage)
            throw new Error();

        const key = "jcfOnRWMIvigArtNb1z3hj6yQ2xlZGiD";
        sessionStorage.setItem(key, key);
        sessionStorage.removeItem(key);

        return sessionStorage;
    } catch (e) {
        let SessionStorage = {}

        Object.defineProperty(SessionStorage, "length", {
            get: function () { return Object.keys(this).length; },
            enumerable: false,
            __proto__: null
        });

        SessionStorage.__proto__.setItem = (key, value) => {
            SessionStorage[key] = value;
        }

        SessionStorage.__proto__.getItem = (key) => {
            return SessionStorage[key];
        }

        SessionStorage.__proto__.clear = () => {
            SessionStorage = {};
        }

        SessionStorage.__proto__.removeItem = (key) => {
            delete SessionStorage[key];
        }

        return SessionStorage;
    }
}

class SessionStorage {

    constructor() {
        this.Storage = Storage();
        this.Callback = [];
    }
    /**
     * @param {boolean} browserStorage Use browser sessionStorage.
     * @param {number} timeout Session timeout period, in minutes.
     */
    config(browserStorage = false, timeout = 0) {
        Config.useBrowserStorage = browserStorage;
        Config.timeout = timeout;
        this.Storage = Storage();
    }
    /**
    * @return {Array<Object>} Return session items.
    */
    items() {
        let sessionData = {};

        Object.keys(this.Storage).forEach(item => { sessionData[item] = this.Storage.getItem(item) });

        return sessionData;
    }
    clear() {
        this.Storage.clear();
    }
    /**
     * @param {string} key Session item key.
     * @param {Object|string} value Session item value. If you are using browser storage, it can only take {:string}.
     */
    set(key, value) {
        Config.recentAccess = new Date();

        this.Storage.setItem(key, value);

        const data = this.items();

        this.Callback.forEach(func => {
            func(data);
        });
    }
    /**
    * @param {string} key Session item key.
    * @return {Object} Session item value. If you are using browser storage, it can return {:string}.
    */
    get(key) {

        if (Config.expired())
            this.Storage.clear();

        return this.Storage.getItem(key);
    }
    /**
    * @param {string} key Session item key.
    */
    remove(key) {
        return this.Storage.removeItem(key);
    }
    /**
    * @param {func} callback Triggered when session items set.
    */
    onSet(callback) {
        callback(this.items())
        this.Callback.push(callback);
    }
}

const Session = new SessionStorage();

export default Session;