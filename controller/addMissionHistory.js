const dbConnection = require("../database/database");
const addExp = require("./updateLevel");
const addPoint = require("./updatePoint");

const checkHistory = (userId,mId,current_date,mPoint,mExp) => {
    var update = true;
    dbConnection.query('SELECT * FROM history', 
    (err,result) => {
        if(err){
            console.log(err);
        }
        if(Object.keys(result).length == 0){
            addHistory(userId,mId,current_date);
            addPoint(userId,mPoint);
            addExp(userId,mExp);
        }
        else{
            dbConnection.query('SELECT * FROM history WHERE u_id', 
            [userId],
            (err,result) => {
                if(err){
                    console.log(err);
                }
                for(i=0;i<Object.keys(result).length;i++){
                    if(result[i].m_id == mId){
                        if(result[i].finish_date.slice(0,10) == current_date){
                            update = false;
                            break;
                        }
                        else{
                            update = true;
                        }
                        
                    }
                    else{
                        update = true
                    }
            }
              if(update == true){
                    addHistory(userId,mId,current_date);
                    addPoint(userId,mPoint);
                    addExp(userId,mExp);
              }
              else{
                console.log('this mission is already add');
              }
            })
        }
    })
}

const addHistory = (userId,mId,current_date) => {
    dbConnection.query('INSERT INTO history (u_id, m_id, finish_date) VALUES (?, ?, ?)', 
                    [userId,mId,current_date],
                    (err) =>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log('this mission is add');
                        }
                    }
                )
}

module.exports = checkHistory;