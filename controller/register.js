const dbConnection = require('../database/database')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req,res) => {
    var email = req.body.u_email;

    if(email != null) {
        dbConnection.query('SELECT * FROM users WHERE u_email=?', 
        [email],
        (err,result) => {
            if(err) {
                res.json({
                    status:'error', message:err
                });
                return
            }
            if(result.length> 0){
                res.json({
                    status:'error'
                });
            }
            else{
                bcrypt.hash(req.body.u_password, saltRounds, (err, hash) => {
                    dbConnection.query(
                        'INSERT INTO levels (level, exp) VALUES (1,0)',
                        (err,result) => {
                            if(err){
                                res.json({status:'error', message:err})
                                return
                            }
                            dbConnection.execute(
                                'INSERT INTO users (u_email, u_password, u_firstname, u_lastname, u_strava, l_id, I_id) VALUES (?,?,?,?,0,?,1)',
                                [req.body.u_email, hash, req.body.u_firstname, req.body.u_lastname, result.insertId],
                                (err,result) => {
                                    if(err) {
                                        res.json({status: 'error', message: err})
                                        return
                                    } 
                                    dbConnection.query(
                                        'INSERT INTO users_has_item (u_id, I_id, s_id) VALUES (?, 1, 1)',
                                        [result.insertId]
                                    )
                                    res.json({status: 'ok'})
                                }
                            );
                        }
                    )
                    
                });
            }
        })
    };
}

module.exports = register;