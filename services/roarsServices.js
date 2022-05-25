const { SPost } = require("../config/db");

const getAllRoars = () => {
    return SPost.find({});
};
