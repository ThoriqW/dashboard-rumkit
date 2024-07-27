const errorHandler = (err, _, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Broke!');
    next()
}

module.exports = errorHandler