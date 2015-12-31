/**
 * hlcommon - common helpers
 * 2015, HoomanLogic, Geoff Manning
 */
(function (factory) {
    module.exports = exports = factory();
}(function () {
    return {
        
        getFriendlyName: function (propertyName) {
            var friendly = propertyName.charAt(0).toUpperCase();
            for (var i = 1; i < propertyName.length; i++) {
                if (propertyName.charAt(i).toUpperCase() === propertyName.charAt(i)) {
                    friendly += ' ' + propertyName.charAt(i);
                } else {
                    friendly += propertyName.charAt(i);
                }
            }
            return friendly;
        },

        /**
         * Returns true if undefined, null, 0, or a blank/whitespace string. Else returns false.
         */
        isBlank: function (obj) {
            if (typeof obj === 'undefined' || obj === null || (typeof obj === 'string' && obj.trim().length === 0)) {
                return true;
            } else {
                return false;
            }
        },
    
        /**
         * Compares 'matchValue' to 'list[i][lookupByProp]' and returns 'list[i][returnProp]'.
         * If list or value is not set, returns a blank string.
         * If no match is found, returns 'value'.
         */
        lookup: function (returnProp, list, lookupByProp, matchValue) {

            /**
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

        },
    
        /**
         * Returns blank string if val is 0 or '0', else returns original value.
         * @param {Object} val - the value to modify to a blank string when 0 or '0'
         */
        zeroToBlank: function (val) {
            if (val === 0) {
                return '';
            }
            if (typeof val === 'string' && val.trim() === '0') {
                return '';
            }
            return val;
        },

        /**
         * Pluralizes a word (US English) based on the count
         */
        pluralize: function (noun, count) {
            if (count === 0) {
                return 'no ' + noun.plural();
            } else if (count === 1) {
                return noun;
            } else {
                return noun.plural();
            }
        },

        /**
         * Returns a unique identifier
         */
        uuid: function () {
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
        }
    };

}));