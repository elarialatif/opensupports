var moment = require('moment');

module.exports = {

    select: function (selected, options) {

        return options.fn(this).replace(new RegExp(`value=${selected}`), '$&selected="selected"');
    },
    ifEquals: function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    time: function (date, format) {
        return moment(date).format(format);
    },
    division: function (pram1, pram2) {
        if (pram2 === 0) return 0;
        else return (Math.round(pram1 / pram2) * 100);
    },
    arRole: function (pram1) {
        switch (pram1) {
            case 'admin':
                return 'مدير';
                break;
            case 'stuff':
                return 'فريق العمل';
                break;
            case 'user':
                return 'مستخدم';
        }
    },
    arDepartment: function (pram1) {
        switch (pram1) {
            case 'support':
                return 'الدعم';
                break;
            case 'developments':
                return 'التطوير';
                break;
        }
    },
};
