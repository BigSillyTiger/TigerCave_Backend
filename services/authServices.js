const User = require("../database/models/user");

const findUser = (username) => {
    return User.findOne({ username });
};

module.exports = {
    findUser,
};
