const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const router = require('./routes');
const path = require('path');
const https = require('https');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const sql = require('./modules/db');

const app = express();
const port = process.env.PORT || 5000;

// OAuth
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

let jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = "GetCreditDeltaStream";

const strategy = new JwtStrategy(jwtOpts, (jwt_payload, next) => {
    sql.query("SELECT * FROM `gc-admin-users` WHERE id = ?", [jwt_payload.id], (error, result) => {
        if (error) next(null, false);
        else {
            if (result[0].id === jwt_payload.id) next(null, result[0]);
            else next(null, false); 
        }
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload({createParentPath: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());
passport.use(strategy);

router(app, passport, jwtOpts);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// set port
//app.listen(port, () => {console.log(`Node app is running on port ${port}`)});

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

app.listen(port, () => {console.log(`Node app is running on port ${port}`)});
https.createServer(options, app).listen(8443, () => {console.log('Node app is running on port 8443')});

module.exports = app;