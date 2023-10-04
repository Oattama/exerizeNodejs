const dbConnection = require("../database/database");
var jwt = require('jsonwebtoken');
const scToken = 'Login';

const auth = (req,res) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, scToken);

    }catch(err) {
        res.json({status: 'error', message: err.message});
    }
    const user_email = JSON.parse(JSON.stringify(decoded.u_email))
    if(user_email != null){
        dbConnection.query('SELECT * FROM users INNER JOIN levels ON users.l_id = levels.l_id INNER JOIN item ON users.I_id = item.I_id INNER JOIN characterimage ON item.ci_id = characterimage.ci_id WHERE u_email=?', 
        [user_email],
        (err,user) => {
            if(err){
                res.json({status:'error', message: err});
            }
            else{
                res.json({status: 'ok', user});
            }
        })
    }
}

module.exports = auth;