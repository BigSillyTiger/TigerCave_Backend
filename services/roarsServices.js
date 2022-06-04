const Roar = require("../database/models/roar");

const getRoars = (option) => {
    return Roar.find(option).sort([["date", "descending"]]);
};

const addRoar = (content) => {
    //const newRoar = new Roar({ ...content });
    //return newRoar.save();
    return Roar.create({ ...content });
};

const updateRoar = (roarID, option) => {
    return Roar.findByIdAndUpdate(roarID, { ...option });
};

const deleteRoar = (roarID) => {
    return Roar.findOneAndDelete({ _id: roarID });
};

module.exports = {
    getRoars,
    addRoar,
    updateRoar,
    deleteRoar,
};
