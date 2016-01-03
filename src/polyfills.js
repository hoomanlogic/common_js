/**
 * HoomanLogic Polyfills Library
 * 2015, HoomanLogic, Geoff Manning
 */
(function () {
    Object.assign = Object.assign || function (target, items) {
        if (typeof target === 'undefined' || target === null) {
            throw new TypeError('Object.assign cannot be called with null or undefined target');
        }
        target = Object(target);

        items = [].slice.call(arguments, 1);

        return items.reduce(function (target, item) {
            return Object.keys(Object(item)).reduce(function (target, property) {
                target[property] = item[property];
                return target;
            }, target);
        }, target);
    };

})();
