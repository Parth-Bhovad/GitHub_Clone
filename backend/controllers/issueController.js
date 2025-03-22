const createIssue = (req, res) => {
    res.send("Issue created!");
};

const updateIssueById = (req, res) => {
    res.send("Issue created!");
};

const deleteIssueById = (req, res) => {
    res.send("Issue deleted!");
};

const getAllIssue = (req, res) => {
    res.send("All Issues fetched!");
};

const getIssueById = (req, res) => {
    res.send("Issue details fetched!");
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssue,
    getIssueById
}