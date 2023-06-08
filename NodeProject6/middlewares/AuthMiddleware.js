const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Middlewares

const auth = (req, res, next) => {
    //console.log(req);
    // Verifico la presenza di un token negli headers della request
    let token = req.headers.authorization;
    //console.log(token)
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'})
    } else {
        token = token.split(' ')[1];
        //console.log(token)
        jwt.verify(token, jwtSecretKey, (err, data) => {
            if(err) {
                console.log(err)
                return res.status(401).json({error: 'Invalid token'})
                //next(err)
            }
        })
    }

    next();
}

module.exports = auth;