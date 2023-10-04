const dbConnection = require("../database/database");
const cutPoint = require("./cutPoint");

const addItem = (req, res) => {

    const IPoint = req.body.I_point;
    const userId = req.body.u_id;

    dbConnection.query('SELECT * FROM users WHERE u_id =?',
    [userId],
    (err,result) => {
        if(err){
            console.log(err)
        }
        if(result[0].u_point < IPoint){
            res.json({status: '2'})
        }
        else{
            dbConnection.query('INSERT INTO users_has_item (u_id, I_id, s_id) VALUES (?, ?, 2)',
            [userId, req.body.I_id],
            (err) => {
                if(err){
                    res.json({status:'error', err})
                }
                else{
                    cutPoint(userId, IPoint)
                    res.json({status:'ok'})
                }
            })
        }   
    })
}

module.exports = addItem;