// Syntactic Sugar for arrays without messing up the array prototype
(function (factory) {
    module.exports = exports = factory();
}(function () {

    var extend = function (array) {
        // extend array with collection-based functions
        array.has = has;
        array.hasAll = hasAll;
        array.hasAny = hasAny;
        array.hasOnly = hasOnly;
        
        array.first = first;
        array.last = last;
        array.top = top;
        array.order = order;
        array.like = like;
        array.find = find;
        array.pluck = pluck;
        
        return array;
    };

    var has = function (value, prop) {
        var i;
        if (typeof prop !== 'undefined' && prop !== null) {
            for (i = 0; i < this.length; i++) {
                if (this[i][prop] === value) {
                    return true;
                }
            }
        } else {
            for (i = 0; i < this.length; i++) {
                if (this[i] === value) {
                    return true;
                }
            }
        }
        return false;
    };

    var hasAll = function (matchArray) {
        for (var i = 0; i < matchArray.length; i++) {
            var matched = false;
            for (var j = 0; j < this.length; j++) {
                if (matchArray[i] === this[j]) {
                    matched = true;
                }     
            }
            if (!matched) {
                return false;
            }
        }
        return true;
    };

    var hasAny = function (matchArray) {
        for (var i = 0; i < matchArray.length; i++) {
            for (var j = 0; j < this.length; j++) {
                if (matchArray[i] === this[j]) {
                    return true;
                }     
            } 
        }
        return false;
    };

    var hasOnly = function (matchArray) {
        // Must be the same length
        if (this.length !== matchArray.length) {
            return false;
        }
        
        for (var i = 0; i < matchArray.length; i++) {
            var matched = false;
            for (var j = 0; j < this.length; j++) {
                if (matchArray[i] === this[j]) {
                    matched = true;
                }     
            }
            if (!matched) {
                return false;
            }
        }
        
        // All elements matched
        return true;
    };

    var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };

    var isObject = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    };

    var like = function (matchObj) {
        var matches = [];
        for (var i = 0; i < this.length; i++) {
            // We assume it matches until we prove it doesn't
            var isLike = true;
            if (typeof matchObj === 'string') {
                if (this[i] === matchObj) {
                    isLike = false;
                }
            }
            else {
                for (var matchProp in matchObj) {
                    if (matchObj.hasOwnProperty(matchProp)) {
                        var t = typeof matchObj[matchProp];
                        if (t !== typeof this[i][matchProp]) {
                            isLike = false;
                            break;
                        }
                        if (isArray(matchObj[matchProp]) && !those(matchObj[matchProp]).hasOnly(this[i][matchProp])) {
                            isLike = false;
                            break;
                        }
                        else if (String(matchObj[matchProp]) !== String(this[i][matchProp])) {
                            isLike = false;
                            break;
                        }
                    }
                }
            }
            // If all match props matched, then add to result
            if (isLike) {
                matches.push(this[i]);
            }
        }
        // Return new array of matched items
        return extend(matches);
    };

    var first = function () {
        if (this.length === 0) {
            return null;
        }
        else {
            return this[0];
        }
    };

    var top = function (num) {
        return extend(this.slice(0, num));
    };

    var last = function (num) {
        return extend(this.slice(-(num)));
    };

    var order = function (prop) {
        return extend(this.sort(function (a, b) {
            if (prop) {
                return a[prop] > b[prop] ? 1 : (a[prop] < b[prop] ? -1 : 0);
            }
            else {
                return a > b ? 1 : (a < b ? -1 : 0);
            }
        }));
    };

    var find = function (value, prop) {
        var i;
        if (typeof prop !== 'undefined' && prop !== null) {
            for (i = 0; i < this.length; i++) {
                if (this[i][prop] === value) {
                    return this[i];
                }
            }
        } else {
            for (i = 0; i < this.length; i++) {
                if (this[i] === value) {
                    return this[i];
                }
            }
        }
        return null;
    };

    var pluck = function (prop) {
        var plucked = [];
        for (var i = 0; i < this.length; i++) {
            plucked.push(this[i][prop]);
        }
        return plucked;
    };

    var those = function (array) {
        return extend(array);
    }
    
    return those;
}));
