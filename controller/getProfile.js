const dbConnection = require("../database/database");

const getProfile = (req,res) => {
    var userId = req.body.u_id;
    var levelSt = [10,20,30,40,50];
    var expSt = [500,1000,2000,3000,4000];

    dbConnection.query('SELECT * FROM users INNER JOIN levels ON users.l_id = levels.l_id INNER JOIN item ON users.I_id = item.I_id INNER JOIN characterimage on item.ci_id = characterimage.ci_id WHERE u_id = ?', 
    [userId],
    (err,user) => {
        if(err){
            res.json({status: 'error', err});
        }
        else{
            for(i=0;i<levelSt.length;i++){
                if(user[0].level<=levelSt[i]){
                    var data = {'expSt' : expSt[i]};
                    Object.assign(user[0], data);
                    break;
                }
            }
            res.json({status:'ok', user})
        }
    })
}

module.exports = getProfile;