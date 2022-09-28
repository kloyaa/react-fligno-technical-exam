const throwError = (res, code, message) => {
    return res.status(code).json(message);
}

module.exports = {
    throwError
}