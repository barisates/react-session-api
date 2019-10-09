const Config = {
  useBrowserStorage: false,
  timeout: 0
}
const Helper = {
  access: new Date(),
  expired: (storage) => {

    const expireMinute = Math.round(((new Date() - Helper.access) / 60000));

    if (expireMinute > Config.timeout && Config.timeout !== 0) {
      console.warn("Session expired!", storage);
      storage.clear();
    }

    Helper.access = new Date();
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

    Object.setPrototypeOf(SessionStorage, {
      setItem: (key, value) => {
        SessionStorage[key] = value;
      },
      getItem: (key) => {
        return SessionStorage[key];
      },
      removeItem: (key) => {
        delete SessionStorage[key];
      },
      clear: () => {
        SessionStorage = {};
      }
    });

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
    Helper.expired(this.Storage);

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
    Helper.expired(this.Storage);

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
    Helper.expired(this.Storage);

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
    const filter = this.Callback.filter(f => f.name === callback.name);
    if (filter.length === 0) {
      callback(this.items())
      this.Callback.push(callback);
    }
  }
  /**
  * @param {string} callbackName Callback function key.
  */
  unmount(callbackName) {
    this.Callback = this.Callback.filter(f => f.name !== callbackName);
  }
}

const Session = new SessionStorage();

export default Session;