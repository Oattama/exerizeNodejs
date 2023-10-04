const check = require("./checkMission");

const auth_link = `https://www.strava.com/oauth/token`;

const getActivity = async (response,mission,userId) => {

    const activities_link = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${response.access_token}`)

    if(activities_link.ok){
        const data = await activities_link.json();
        var getValue = await check(data,mission,userId);
    }
    else{
        console.log('error');
    }

    return getValue;
                     
}   

const reAuthorize = async (strava_code,mission,userId) =>{
    const refresh_token = await fetch(auth_link, {
        method:'post',
        headers: {
            'Accept' : 'application/json, text/plain, */*',
            'Context-Type' : 'application/x-www-form-urlencoded'
        },

        body: new URLSearchParams({

            'client_id': '92220',
            'client_secret': '4ce054b1c9a64207a93e59359a73459f8b77941e',
            'refresh_token': strava_code,
            'grant_type': 'refresh_token'
        })
    })

    if(refresh_token.ok){
        const response = await refresh_token.json();
        var getValues = await getActivity(response,mission,userId);
    }
    else{
        console.log('error');
    }

    return getValues;
    
}

module.exports = reAuthorize;