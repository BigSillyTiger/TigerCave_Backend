const Roar = require("../database/models/roar");

const getRoars = async (option) => {
    return await Roar.find(option).sort([["date", "descending"]]);
};

const addRoar = async (content) => {
    return await Roar.create({ ...content });
};

const updateRoar = async (roarID, option) => {
    return await Roar.findByIdAndUpdate(roarID, { ...option });
};

const deleteRoar = async (roarID) => {
    return await Roar.findOneAndDelete({ _id: roarID });
};

module.exports = {
    getRoars,
    addRoar,
    updateRoar,
    deleteRoar,
};
