const dbConnection = require("../database/database");
const auth_link = `https://www.strava.com/oauth/token`;

const getRefresh_token = (req) => {
  const user = req.body.u_email;

  fetch(auth_link, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Context-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({
      client_id: `${process.env.client_id}`,
      client_secret: `${process.env.client_secret}`,
      code: req.body.code,
      grant_type: "authorization_code",
    }),
  })
    .then((res) => res.json())
    .then((res) => insertRefresh_token(res, user));
};

const insertRefresh_token = (res, user) => {
  dbConnection.query(
    "UPDATE users SET u_strava = ? WHERE u_email = ?",
    [res.refresh_token, user],
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("ok");
    }
  );
};

module.exports = getRefresh_token;
