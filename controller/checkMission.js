const checkHistory = require('./addMissionHistory');

const check = async(data,mission,userId) => {
   const activity_length = Object.keys(data).length;
   const mission_length = Object.keys(mission).length;
   var current_mission = [];
   var date = new Date();
   var month = date.getUTCMonth() + 1;
   var day = date.getUTCDate();
   var year = date.getUTCFullYear();
   var current_date = year + '-' + month + '-' + day;

   for(i=0; i<activity_length; i++){
    if(data[i].start_date.slice(0,10) == current_date){
        for(j=0; j<mission_length; j++){
            if(data[i].type.toLowerCase() == mission[j].m_type){
                if(data[i].distance >= mission[j].t_target){
                    var missions = {
                        "m_id" : mission[j].m_id,
                        "distance" : data[i].distance
                    }
                    const mId = mission[j].m_id;
                    const mPoint = mission[j].r_point;
                    const mExp = mission[j].r_exp;
                    current_mission.push(missions);
                    console.log('this mission is complete')
                    checkHistory(userId,mId,current_date,mPoint,mExp);
                }
                else{
                    var missions = {
                        "m_id" : mission[j].m_id,
                        "distance" : data[i].distance
                    }
                    current_mission.push(missions)
                    console.log('this mission is uncomplete');
                }
            }
            else{
                console.log('this mission is not match');
            }
        }
    }
        
}   
    if(current_mission.length == 0){
        for(i=0; i<mission_length; i++){
            var data = {'distance' : 0};
            Object.assign(mission[i], data);
        }
        return mission;
    }
        add_distance(current_mission, mission);
        return mission;
    
}

const add_distance =  (current_mission, mission) => {
    
    var mission_length = Object.keys(mission).length;
    var current_length = Object.keys(current_mission).length;
    var set_break = false;

    for(i=0;i<mission_length; i++){
        set_break = false
        for(j=0;j<current_length;j++){
            if(current_mission[j].m_id==mission[i].m_id){
                const distance = current_mission[j].distance;
                var data = {'distance' : distance};
                Object.assign(mission[i], data);
                set_break = true;
            }
            else{
                var data = {'distance' : 0};
                Object.assign(mission[i], data);
                console.log('not match' + i);
            }
            if(set_break == true){
                break;
            }
        }
    }
}

module.exports = check