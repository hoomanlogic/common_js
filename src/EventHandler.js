(function (factory) {
    module.exports = exports = factory(
        require('rx')
    );
}(function (Rx) {
    return {
        create: function create () {
            function subject (value) {
                subject.onNext(value);
            }

            /* eslint-disable guard-for-in */
            for (var key in Rx.Subject.prototype) {
                subject[key] = Rx.Subject.prototype[key];
            }
            /* eslint-enable guard-for-in */

            Rx.Subject.call(subject);

            return subject;
        }
    };
}));
