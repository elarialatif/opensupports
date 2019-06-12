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
};
