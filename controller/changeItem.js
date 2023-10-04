const dbConnection = require("../database/database");

const change = (req, res) => {
    const userId = req.body.u_id;
    const itemId = req.body.I_id;
    const currentItemId = req.body.I_id2;
    dbConnection.query('UPDATE users_has_item SET s_id = 1 WHERE u_id = ? AND users_has_item.I_id = ?',
    [userId, itemId],
    (err) => {
        if(err){
            res.json({status: 'error', err});
        }
        else{
                dbConnection.query('UPDATE users_has_item SET s_id = 2 WHERE u_id = ? AND users_has_item.I_id = ?',
                [userId, currentItemId],
                    (err) => {
                        if(err){
                            res.json({status: 'error', err});
                        }
                        else{
                            dbConnection.query('UPDATE users SET I_id = ? WHERE u_id = ?',
                        [itemId, userId],
                        (err) => {
                            if(err){
                                res.json({status: 'error', err});
                            }
                            else{
                                res.json({status: 'ok'})
                            }
                        })
                }
            })
        }
    })
}

module.exports = change;