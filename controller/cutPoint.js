const dbConnection = require("../database/database");

const cutPoint = (userId, IPoint ) => {

    dbConnection.query('SELECT * FROM users WHERE u_id = ?',
    [userId],
    (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            var point = result[0].u_point - IPoint
            dbConnection.query('UPDATE users SET u_point = ? WHERE u_id = ?',
            [point ,userId],
            (err) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('update point successful')
                }
            })
        }
    })
}

module.exports = cutPoint