//file to write the logic for the localCache cache.js
//instnatiate a local cahce instance
var Cache = function() {
    var self = this;
    self._cache = {};
    self._timeouts = {};
    self._size = 0;

    return self;
};
//expose a cache size method
Cache.prototype.size = function() {
        return this._size;
};
//expose a put method that sets the key, value, and expiry time
Cache.prototype.put = function(key, value, time) {
    var self = this;

    if (self._timeouts[key]) {
        clearTimeout(self._timeouts[key]);
        delete self._timeouts[key];
    }

    self._cache[key] = value;

    if (!isNaN(time)) {
        self._timeouts[key] = setTimeout(self.del.bind(self, key), time);
    }

    ++self._size;
};
//expose a cache delete method to remove a key when the time expires
Cache.prototype.del = function(key) {
    var self = this;

    clearTimeout(self._timeouts[key]);
    delete self._timeouts[key];

    if (!(key in self._cache)) {
        return false;
    }

    delete self._cache[key];
    --self._size;
    return true;
};
//expose a get method to return value from the cache
Cache.prototype.get = function(key) {
    var self = this;

    if (typeof key === 'undefined') {
        return self._cache;
    }

    if (!(key in self._cache)) {
        return null;
    }

    return self._cache[key];
};


module.exports = Cache;
