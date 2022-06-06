const User = require("../database/models/user");

const findUser = async (username) => {
    return await User.findOne({ username });
};

module.exports = {
    findUser,
};
