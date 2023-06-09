// Middlewares

const logUrl = (req, res, next) => {
    console.log("Request at " + req.url + " - Method: " + req.method );
    next();
}

const  errorHandler = (err, req, res, next) => {
    console.log(err.status, err.message)
    //console.error("Sono il middleware errorHandler!! " + e);
    return res.status(err.status).json({error: err.message});
}

module.exports = { logUrl, errorHandler };