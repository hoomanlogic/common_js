/**
 * HoomanLogic Extensions Library
 * 2015, HoomanLogic, Geoff Manning
 */

(function () {
    'use strict';

    //#region Array Extensions
    Array.prototype.contains = function (value, prop) {
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

    Array.prototype.find = function (value, prop) {
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

    Array.prototype.toSimpleArray = function (prop) {
        var simple = [];
        for (var i = 0; i < this.length; i++) {
            simple.push(this[i][prop]);
        }
        return simple;
    };
    //#endregion

    //#region Date Extensions
    Date.prototype.getMidnight = function () {
        return new Date((new Date()).toLocaleDateString());
    };

    Date.prototype.getFirstOfMonth = function () {
        return new Date(this.getFullYear() + '-' + (this.getMonth() + 1) + '-01' + ' ' + this.toString().split(' ')[5]);
    };

    Date.prototype.getBeginningOfWeek = function (weekStart) {
        if (typeof weekStart === 'undefined') {
            weekStart = 0;
        }

        var date = this.getMidnight();
        var diff = weekStart - date.getDay();
        if (weekStart > date.getDay()) {
            date.setDate(date.getDate() + (diff - 7));
        } else {
            date.setDate(date.getDate() + diff);
        }

        return date;
    };

    Date.prototype.toDashDate = function () {
        var month = String(this.getMonth() + 1);
        var date = String(this.getDate());
        if (month.length === 1) {
            month = '0' + month;
        }
        if (date.length === 1) {
            date = '0' + date;
        }
        return this.getFullYear() + '-' + month + '-' + date;
    };
    //#endregion

    //#region String Extensions
    String.prototype.plural = function () {
        if (this[this.length - 1] === 'y') {
            return this.substring(0, this.length - 1) + 'ies';
        } else {
            return this + 's';
        }
    }
    //#endregion

})();
