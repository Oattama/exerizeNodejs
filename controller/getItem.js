const dbConnection = require("../database/database");

const getItem = (req,res) => {
    const userItem = [];
    dbConnection.query('SELECT * FROM users_has_item INNER JOIN status ON users_has_item.s_id = status.s_id WHERE u_id = ?',
    [req.body.u_id],
    (err,item) => {
        var itemLength = Object.keys(item).length;
        if(err){
            res.json({status: 'error', err});
        }
        else{
            for(i=0;i<itemLength;i++){
                var item2 = {
                    "I_id" : item[i].I_id,
                    "status" : item[i].s_name
                }
                userItem.push(item2);
            }
    dbConnection.query('SELECT I_id, I_name, I_point, ci_image FROM item INNER JOIN characterimage ON item.ci_id = characterimage.ci_id',
    (err,result) => {
        var set_break = false;
        if(err){
            res.json({status: 'error', err});
        }
        else{
            if(userItem.length == 0){
                 for(k=0;k<Object.keys(result).length;k++){
                    var item = {
                        'status': 0
                    }
                    Object.assign(result[k], item);
                }
                res.json({status: 'ok', result})
            }
            else{
                    for(i=0;i<Object.keys(result).length;i++){
                        set_break = false;
                        for(j=0;j<userItem.length;j++){
                            if(result[i].I_id == userItem[j].I_id){
                                const status = userItem[j].status
                                var item = {
                                    'status': status
                                }
                                Object.assign(result[i], item);
                                set_break = true;
                            }
                            else{
                                var item = {
                                    'status': 0
                                }
                                Object.assign(result[i], item);
                            }
                            if(set_break == true){
                                break;
                            }
                        }
                    }
                    res.json({status: 'ok', result})
            }
        }
    })
        }
    })
    
}

module.exports = getItem;