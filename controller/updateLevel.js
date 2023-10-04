const dbConnection = require("../database/database");


const addExp = (userId,mExp) => {
    var checkAdd = false

    dbConnection.query('SELECT * FROM  users INNER JOIN levels ON users.l_id = levels.l_id WHERE u_id = ?', 
    [userId], 
    async (err,level) => {
        if(err){
            console.log(err);
        }
        else{
            if(level[0].level == 50){
                console.log('your level is max')
            }
            else{
                var addExp = level[0].exp + mExp;
                var userLevel = level[0].level;
                var levelId = level[0].l_id 
                var getLevel = await calculateLevel(addExp, userLevel, levelId, checkAdd);

                var expLeft = await getLevel[1];
                var levelUpdate = await getLevel[0]; 

                checkAdd = await getLevel[2];

                if(checkAdd == true){
                    dbConnection.query('UPDATE levels SET level = ?, exp = ? WHERE l_id = ?',
                    [levelUpdate,expLeft,levelId], 
                    (err) =>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log('update level and exp successful')
                        }
                    })
                }
            }
        }
    }
)
}

const calculateLevel = (addExp, userLevel, levelId, checkAdd) => {
    const level_standard = [10,20,30,40,50];
    const exp_standard = [500,1000,2000,3000,4000];

    for(i=0;i<level_standard.length;i++){
        if(userLevel<level_standard[i]){
            if(addExp >= exp_standard[i]) {
                addExp = addExp - exp_standard[i];
                userLevel=userLevel+1;
                checkAdd = true;
                console.log('level up');
            }
            else{
                dbConnection.query('UPDATE levels SET exp = ? WHERE l_id = ?',
                [addExp,levelId],
                (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('level is not up yet');
                    }
                })
            }
            break;
        }
    }

    return [userLevel, addExp, checkAdd];
}

module.exports = addExp;