
const getPersonas = (req, res  ) => {
    return res.send("Get personas");  
};

const createPersona = (req, res) => {
    return res.send("Create persona");
};

const updatePersona = (req, res) => {
    return res.send("Update persona");
};

const deletePersona = (req, res) => {
    return res.send("Delete persona");
};

module.exports = {getPersonas, createPersona, updatePersona, deletePersona};