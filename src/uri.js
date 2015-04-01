/**
 * hluri - URI Helpers
 * 2015, HoomanLogic, Geoff Manning
 */

(function (exports) {
    'use strict';

    /**
     * Returns an object with properties for each key in url query string
     * that follows a hash in the current window location.
     * So far, only known use is for access token authentication url callbacks.
     */
    exports.parseHashToken = function () {
        if (window.location.hash.indexOf('#') === 0) {
            return exports.parseQueryString(window.location.hash.substr(1));
        } else {
            return {};
        }
    };
    
    /**
     * Returns an object with properties 
     * for each key in url query string.
     * Ie. "maxresult=20&orderby=date" results 
     * in {maxresults: '20', orderby: 'date'}
     */
    exports.parseQueryString = function (queryString) {
        var data = {},
            pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

        if (queryString === null) {
            return data;
        }

        pairs = queryString.split("&");

        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf("=");

            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            } else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }

            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);

            data[key] = value;
        }

        return data;
    }
}(typeof exports === 'undefined' ? this['hluri'] = {}: exports));