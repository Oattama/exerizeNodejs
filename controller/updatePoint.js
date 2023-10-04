const dbConnection = require("../database/database");

const addPoint = (userId, mPoint) => {
    dbConnection.query('SELECT u_point FROM users WHERE u_id = ?', 
    [userId], 
    (err,point) => {
        if(err){
            console.log(err);
        }
        else{
            var point = point[0].u_point + mPoint;
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

module.exports = addPoint;
