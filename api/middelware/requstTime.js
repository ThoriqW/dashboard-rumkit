const requestTime = (_, res, next) => {
    console.info(res.requestTime = new Date().toLocaleString('id-ID'))
    next()
}

module.exports = requestTime;