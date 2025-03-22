const attachUserId = (req, res, next) => {
    req.userId = req.params.id;
    next();
}

module.exports = attachUserId;