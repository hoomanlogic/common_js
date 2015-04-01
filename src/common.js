/**
 * HoomanLogic Common Library
 * 2015, HoomanLogic, Geoff Manning
 * Namespace: hl.common
 * Dependencies: jquery 1.11.1
 */
var hl = hl || {};
var exports = module.exports = {};
exports.hl = hl;

hl.common = (function (ns, $) {
    'use strict';

    ns.getFriendlyName = function (propertyName) {
		var friendly = propertyName.charAt(0).toUpperCase();
		for (var i = 1; i < propertyName.length; i++) {
			if (propertyName.charAt(i).toUpperCase() === propertyName.charAt(i)) {
				friendly += ' ' + propertyName.charAt(i);
			} else {
				friendly += propertyName.charAt(i);
			}
		}
		return friendly;
    };

    /*
     * Returns true if undefined, null, 0, or a blank/whitespace string. Else returns false.
     */
    ns.isBlank = function (obj) {
        if (typeof obj === 'undefined' || obj === null || (typeof obj === 'string' && obj.trim().length === 0)) {
            return true;
        } else {
            return false;
        }
    };
    
    /*
     * Compares 'matchValue' to 'list[i][lookupByProp]' and returns 'list[i][returnProp]'.
     * If list or value is not set, returns a blank string.
     * If no match is found, returns 'value'.
     */
    ns.lookup = function (returnProp, list, lookupByProp, matchValue) {

        /*
         * If list or value is not set, return a blank string.
         */
        if (typeof returnProp === 'undefined' || 
            returnProp === null || 
            typeof returnProp !== 'string' ||
            returnProp.trim().length === 0 ||
            typeof list === 'undefined' || 
            list === null ||
            typeof lookupByProp === 'undefined' || 
            lookupByProp === null ||
            typeof lookupByProp !== 'string' ||
            lookupByProp.trim().length === 0) {
            
            return matchValue;
        }

        /*
         * Find item in list and return value of returnProp
         */
        for (var i = 0; i < list.length; i++) {
            if (list[i][lookupByProp] === matchValue) {
                return list[i][returnProp];
            }
        }

        /*
         * No match found, return 'matchValue'. 
         */
        return matchValue;
        
    };
    
    /**
     * Returns blank string if val is 0 or '0', else returns original value.
     * @param {Object} val - the value to modify to a blank string when 0 or '0'
     */
    ns.zeroToBlank = function (val) {
        if (val === 0) {
            return '';
        }
        if (typeof val === 'string' && val.trim() === '0') {
            return '';
        }
        return val;
    };

    ns.pluralize = function (noun, count) {
        if (count === 0) {
            return 'no ' + noun.plural();
        } else if (count === 1) {
            return noun;
        } else {
            return noun.plural();
        }
    };
    
    ns.store = function (namespace, data) { 
        if (data) { 
            return localStorage.setItem(namespace, JSON.stringify(data));
        } 

        var localStore = localStorage.getItem(namespace); 
        return (localStore && JSON.parse(localStore)) || []; 
    };

    ns.assign = function (target, items) { 

        items = [].slice.call(arguments, 1); 

        return items.reduce(function (target, item) { 
            return Object.keys(item).reduce(function (target, property) { 
                target[property] = item[property]; 
                return target; 
            }, target); 
        }, target); 
    }; 

    ns.uuid = function () {
        var i, random;
        var result = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                result += '-';
            }
            result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }

        return result;
    };

    ns.getFragment = function getFragment() {
        if (window.location.hash.indexOf("#") === 0) {
            return parseQueryString(window.location.hash.substr(1));
        } else {
            return {};
        }
    };
    
    ns.saveLocal = function (location, result, secret) {
        var value = JSON.stringify(result);
        var encrypted = CryptoJS.AES.encrypt(value, secret);
        $.jStorage.set(location, encrypted.toString() );
    };
    
    ns.loadLocal = function (location, secret) {
        var encrypted = $.jStorage.get(location);
        try {
            var decrypted = CryptoJS.AES.decrypt(encrypted, secret);
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (ex) {
            return encrypted;
        }
    };

    function parseQueryString(queryString) {
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

    return ns;
}(hl.common || {}, $));