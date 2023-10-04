const dbConnection = require('../database/database');
const reAuthorize = require('./getActivity');

const getMission = (req,res) =>{
        const level_standard = [10,20,30,40,50];
        const db_search = ['SELECT m_id, m_name, m_type, m_level, t_target, r_point, r_exp FROM mission INNER JOIN target ON mission.t_id = target.t_id INNER JOIN reward ON mission.r_id = reward.r_id WHERE m_level <= 10',
        'SELECT m_id, m_name, m_type, m_level, t_target, r_point, r_exp FROM mission INNER JOIN target ON mission.t_id = target.t_id INNER JOIN reward ON mission.r_id = reward.r_id  WHERE m_level > 10 AND m_level <= 20',
        'SELECT m_id, m_name, m_type, m_level, t_target, r_point, r_exp FROM mission INNER JOIN target ON mission.t_id = target.t_id INNER JOIN reward ON mission.r_id = reward.r_id  WHERE m_level > 20 AND m_level <= 30',
        'SELECT m_id, m_name, m_type, m_level, t_target, r_point, r_exp FROM mission INNER JOIN target ON mission.t_id = target.t_id INNER JOIN reward ON mission.r_id = reward.r_id  WHERE m_level > 30 AND m_level <= 40',
        'SELECT m_id, m_name, m_type, m_level, t_target, r_point, r_exp FROM mission INNER JOIN target ON mission.t_id = target.t_id INNER JOIN reward ON mission.r_id = reward.r_id  WHERE m_level > 40 AND m_level <= 50'
    ];
        let i = 0;

        dbConnection.query('SELECT * FROM users WHERE u_id=?', 
            [req.body.u_id],
            (err,result) => {
                if(err){
                    res.send({status: 'error', message: err})
                }
                else{
                    const user = JSON.parse(JSON.stringify(result))
                    const strava_code = user[0].u_strava 
                    dbConnection.query('SELECT * FROM levels WHERE l_id=?', 
                    [user[0].l_id],
                    (err,level) => {
                        JSON.parse(JSON.stringify(level))
                        if(level[0].level != null){
                            while(i < level_standard.length){
                                if(level[0].level <= level_standard[i]){
                                    dbConnection.query(db_search[i], async (err, mission) => {
                                        if(err){
                                            res.send({status: 'error', message:err});
                                        }
                                        else{
                                            var userId = user[0].u_id;
                                            if(user[0].u_strava == "0"){
                                                for(i=0; i<Object.keys(mission).length;i++){
                                                    var data = {'distance' : 0};
                                                    Object.assign(mission[i], data); 
                                                }                                              
                                                res.json({status: 'ok', mission});
                                            }
                                            else{
                                                const Values = await reAuthorize(strava_code,mission,userId);
                                                res.json({status: 'ok2', Values});
                                            }          
                                        }
                                    })
                                    break;  
                                }
                                else{
                                    i++
                                }
                            }
                        }
                        else{
                            res.send({status: 'error', message:err});
                        }
                    }
                    )
                }
            })
}

module.exports = getMission;