const dbConnection = require("../database/database");

const ranking = (req,res) => {
    dbConnection.query('SELECT u_id, u_firstname, u_lastname, level, ci_image FROM users INNER JOIN levels ON users.l_id = levels.l_id INNER JOIN item ON users.I_id = item.I_id INNER JOIN characterimage ON item.ci_id = characterimage.ci_id ORDER BY level DESC',
    (err,result) => {
        if(err){
            res.json({status: 'error', err})
        }
        else{
            for(i=0;i<Object.keys(result).length;i++){
                var rank = {'rank' : i+1};
                Object.assign(result[i], rank);
            }
            res.json({status: 'ok', result})
        }
    })
}

module.exports = ranking;