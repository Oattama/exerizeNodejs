const dbConnection = require('../database/database');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const scToken = 'Login';

const login = (req,res) => {
    dbConnection.execute(
        'SELECT * FROM users WHERE u_email=?',
        [req.body.u_email],
        (err, users) => {
            if (err) {res.json({
                status:'error', message: err
            }); 
            return
        }
            if (users.length == 0) { res.json({
                status: 'error', message: 'no user found'
            }); 
            return
        }
        bcrypt.compare(req.body.u_password, users[0].u_password, (err, isLogin) => {
            if (isLogin) {
                var token =jwt.sign({ u_email: users[0].u_email}, scToken, { expiresIn: '1h'});
                res.json({status: 'ok', token});
            }else {
                res.json({status: 'error'});
            }
        })
        }
    );
}

module.exports = login;