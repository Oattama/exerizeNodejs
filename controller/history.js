const dbConnection = require("../database/database");

const history = (req, res) => {
    dbConnection.query('SELECT * FROM history INNER JOIN mission ON history.m_id = mission.m_id INNER JOIN target ON mission.t_id = target.t_id WHERE u_id = ?',
    [req.body.u_id],
    (err,info) => {
        if(err){
            res.json({status: 'error', err});
        }
        else{
            res.json({status:'ok', info});
        }
    })
}

module.exports = history;