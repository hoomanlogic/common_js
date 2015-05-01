// CommonJS, AMD, and Global shim
(function (root, factory) {
    'use strict';

	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(
            require('./io')
        );
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([
            './io'
        ], factory);
	}
	else {
		// Global (browser)
		root.hlstore = factory(root.hlio);
	}
}(this, function (hlio) {
    'use strict';
    
    var Store = function () {
        this.updates = { value: null };
        this.subscribers = [];
    }
    
    Store.prototype = {
        subscribe: function (callback) {
            this.subscribers.push(callback);
        },
        dispose: function (callback) {
            for (var i = 0; i < this.subscribers.length; i++) {
                if (callback === this.subscribers[i]) {
                    this.subscribers.splice(i, 1);
                }
            }
        },
        notify: function () {
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i](this.updates.value);
            }
        },
        loadLocal: hlio.loadLocal, 
        saveLocal: hlio.saveLocal
    };
    
    return {
        Store: Store
    };
    
}));