// CommonJS, AMD, and Global shim
(function (factory) {
    'use strict';
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require('rx'));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(['rx'], factory);
	}
	else {
		// Global (browser)
		window.EventHandler = factory(window.Rx);
	}
}(function (Rx) {
    'use strict';
    
    return { 
        create: function create() {
            function subject(value) {
                subject.onNext(value);
            }

            for (var key in Rx.Subject.prototype) {
                subject[key] = Rx.Subject.prototype[key];
            }

            Rx.Subject.call(subject);

            return subject;
        } 
    };
}));