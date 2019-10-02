


const Storage = (store = true) => {

    try {

        if (!store)
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

        return SessionStorage;
    }
}

class SessionStorage {

    #Storage;
    #Callback;

    constructor() {
        this.#Storage = Storage(false);
        this.#Callback = [];
    }

    items() {

        let sessionData = {};

        Object.keys(this.#Storage).forEach(item => { sessionData[item] = this.#Storage.getItem(item) });

        return sessionData;
    }
    clear() {
        this.#Storage.clear();
    }
    set(key, value) {
        this.#Storage.setItem(key, value);

        const data = this.items();

        this.#Callback.forEach(func => {
            func(data);
        });
    }
    get(key) {
        return this.#Storage.getItem(key);
    }
    onSet(callback) {
        callback(this.items())
        this.#Callback.push(callback);
    }
}
const Session = new SessionStorage();
export default Session;


