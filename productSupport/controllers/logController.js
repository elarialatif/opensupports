var Log = require('../models/Log');
module.exports = {
    addLog: function (name, user, model, modelObjectId, action, email) {
        let newLog = new Log();
        newLog.name = name;
        newLog.user = user;
        newLog.model = model;
        newLog.action = action;
        newLog.email = email;
        newLog.modelObjectId = modelObjectId;
        return newLog.save().then(result => {
            return result;
        })
    }
}
