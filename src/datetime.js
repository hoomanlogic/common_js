 /**
 * HoomanLogic DateTime Library
 * 2015, HoomanLogic, Geoff Manning
 * Namespace: hl.datetime
 * Dependencies: jquery 1.11.1
 */
var hl = hl || {};

hl.datetime = (function (ns, $) {
    'use strict';

    ns.daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    ns.monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];

    ns.dateOnly = function (datetime) {
        if (typeof datetime === 'undefined') {
            return '';
        }

        var tindex = datetime.indexOf('T');
        if (tindex > 0) {
            return datetime.slice(0, tindex);
        }
    };

    /**
     * Calculates the number of days between two dates.
     * @param {Date} d1 - a date for comparison
     * @param {Date} d2 - a date for comparison
     */
    ns.dayDiff = function (d1, d2) {
        var days = Math.abs(d1 - d2) / 86400000;
        return days;
    };

    /**
     * Calculates the number of hours between two dates.
     * @param {Date} d1 - a date for comparison
     * @param {Date} d2 - a date for comparison
     */
    ns.hourDiff = function (d1, d2) {
        return Math.abs(d1 - d2) / 36e5;
    };

    ns.getDaysOfWeek = function (numOfDays, start) {
        // build weekdays by starting at the index of the desired start of week (ie. 1 for Monday)
        // and going 7 days, resetting to 0(Sunday) when index passes 6(Saturday)
        var today = new Date().getMidnight();

        var dayIndex = 0;
        var isDate = false;
        var result = [];
        var date = null;
        if (start instanceof Date) {
            // include date information
            isDate = true;
            dayIndex = start.getDay();
            date = start;
        } else {
            dayIndex = start;
        }
        for (var i = 0; i < numOfDays; i++) {
            var className = 'calendar-future';
            if (date.getTime() === today.getTime()) {
                className = 'calendar-today';
            } else if (date.getTime() < today.getTime()) {
                className = 'calendar-past';
            }

            if (date.getMonth() !== today.getMonth()) {
                className += ' calendar-other-month';
            }

            result.push({
                dayId: dayIndex,
                day: ns.daysOfWeek[dayIndex],
                date: new Date(date.toString()),
                className: className
            });

            dayIndex++;
            if (dayIndex > 6) {
                dayIndex = 0;
            }

            if (isDate === true) {
                date.setDate(date.getDate() + 1);
            }
        }

        return result;
    };
    
    ns.getAdjustedDay = function (day, weekStart) {
        var adjDay = day - weekStart;
        if (adjDay < 0) {
            adjDay = 7 + adjDay;
        }
        return adjDay;
    };

    ns.formatDay = function (time) {
        var days = [
            { key: 0, value: 'Sunday' },
            { key: 1, value: 'Monday' },
            { key: 2, value: 'Tuesday' },
            { key: 3, value: 'Wednesday' },
            { key: 4, value: 'Thursday' },
            { key: 5, value: 'Friday' },
            { key: 6, value: 'Saturday' }
        ];

        var d = new Date(apiTime * 1000);
        return days[d.getDay()].value;
    };
    
    // Date object is milliseconds since 1/1/1970
    // However, time in forecast.io api is seconds since 1/1/1970
    // so we must convert to milliseconds before casting it as a date
    ns.convertSecondsToMilli = function (seconds) {
        return seconds * 1000;
    };

    ns.getDateFromSeconds = function (seconds) {
        return new Date(seconds * 1000);
    };

    //#region Formatting
    ns.formatTime = function (seconds) {
        return ns.getDateFromSeconds(seconds).toLocaleTimeString();
    };

    ns.formatDateTime = function (date) {
        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "numeric", minute: "2-digit"
        };
        date = new Date(date);
        return date.toLocaleTimeString("en-us", options); // ‎Friday‎, ‎Feb‎ ‎1‎, ‎2013‎ ‎6‎:‎00‎ ‎AM
    };

    ns.formatTimeFromMinutes = function (minutes) {
        var hours = 0;
        if (minutes < 60) {
            return '0:' + minutes;
        } else {
            var leftover = minutes % 60;

            hours = (minutes - leftover) / 60;

            return (hours < 10 ? '0' + hours : hours) + ':' + (leftover < 10 ? '0' + leftover : leftover);
        }
    };

    ns.formatDuration = function (minutes) {
        if (minutes < 60) {
            return minutes + ' ' + hl.common.pluralize('minute', minutes);
        } else {
            var leftover = minutes % 60;

            var hours = (minutes - leftover) / 60;

            return hours + ' ' + hl.common.pluralize('hour', hours) + ' and ' + leftover + ' ' + hl.common.pluralize('minute', leftover);
        }
    };
    //#endregion

    ns.getLocalDate = function (str) {
        str = str.split('-');
        return new Date(parseInt(str[0]), parseInt(str[1]) - 1, parseInt(str[2]));
    };
    
    ns.parseLocalDate = function (str) {
        var date = null;
        if (Date.parse(str) === NaN) {
            date = null;
        } else {
            date = new Date(Date.parse(str));
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        }
        return date;
    }

    return ns;
}(hl.datetime || {}, $));