"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Config = {
  useBrowserStorage: false,
  timeout: 0
};
var Helper = {
  access: new Date(),
  expired: function expired(storage) {
    var expireMinute = Math.round((new Date() - Helper.access) / 60000);

    if (expireMinute > Config.timeout && Config.timeout !== 0) {
      console.warn("Session expired!", storage);
      storage.clear();
    }

    Helper.access = new Date();
  }
};

var Storage = function Storage() {
  try {
    if (!Config.useBrowserStorage) throw new Error();
    var key = "jcfOnRWMIvigArtNb1z3hj6yQ2xlZGiD";
    sessionStorage.setItem(key, key);
    sessionStorage.removeItem(key);
    return sessionStorage;
  } catch (e) {
    var _SessionStorage = {};
    Object.defineProperty(_SessionStorage, "length", {
      get: function get() {
        return Object.keys(this).length;
      },
      enumerable: false,
      __proto__: null
    });
    Object.setPrototypeOf(_SessionStorage, {
      setItem: function setItem(key, value) {
        _SessionStorage[key] = value;
      },
      getItem: function getItem(key) {
        return _SessionStorage[key];
      },
      removeItem: function removeItem(key) {
        delete _SessionStorage[key];
      },
      clear: function clear() {
        _SessionStorage = {};
      }
    });
    return _SessionStorage;
  }
};

var SessionStorage =
/*#__PURE__*/
function () {
  function SessionStorage() {
    _classCallCheck(this, SessionStorage);

    this.Storage = Storage();
    this.Callback = [];
  }
  /**
   * @param {boolean} browserStorage Use browser sessionStorage.
   * @param {number} timeout Session timeout period, in minutes.
   */


  _createClass(SessionStorage, [{
    key: "config",
    value: function config() {
      var browserStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      Config.useBrowserStorage = browserStorage;
      Config.timeout = timeout;
      this.Storage = Storage();
    }
    /**
    * @return {Array<Object>} Return session items.
    */

  }, {
    key: "items",
    value: function items() {
      var _this = this;

      Helper.expired(this.Storage);
      var sessionData = {};
      Object.keys(this.Storage).forEach(function (item) {
        sessionData[item] = _this.Storage.getItem(item);
      });
      return sessionData;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.Storage.clear();
    }
    /**
     * @param {string} key Session item key.
     * @param {Object|string} value Session item value. If you are using browser storage, it can only take {:string}.
     */

  }, {
    key: "set",
    value: function set(key, value) {
      Helper.expired(this.Storage);
      this.Storage.setItem(key, value);
      var data = this.items();
      this.Callback.forEach(function (func) {
        func(data);
      });
    }
    /**
    * @param {string} key Session item key.
    * @return {Object} Session item value. If you are using browser storage, it can return {:string}.
    */

  }, {
    key: "get",
    value: function get(key) {
      Helper.expired(this.Storage);
      return this.Storage.getItem(key);
    }
    /**
    * @param {string} key Session item key.
    */

  }, {
    key: "remove",
    value: function remove(key) {
      return this.Storage.removeItem(key);
    }
    /**
    * @param {func} callback Triggered when session items set.
    */

  }, {
    key: "onSet",
    value: function onSet(callback) {
      var filter = this.Callback.filter(function (f) {
        return f.name === callback.name;
      });

      if (filter.length === 0) {
        callback(this.items());
        this.Callback.push(callback);
      }
    }
    /**
    * @param {string} callbackName Callback function key.
    */

  }, {
    key: "unmount",
    value: function unmount(callbackName) {
      this.Callback = this.Callback.filter(function (f) {
        return f.name !== callbackName;
      });
    }
  }]);

  return SessionStorage;
}();

var Session = new SessionStorage();
var _default = Session;
exports["default"] = _default;
