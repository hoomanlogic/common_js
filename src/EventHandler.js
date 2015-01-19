var EventHandler = { 
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