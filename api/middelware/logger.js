const logger = (req, _, next) => {
    console.info(`Request URL:${req.originalUrl}`);
    console.info(`Request Type :${req.method}`);
    next()
}

module.exports = logger