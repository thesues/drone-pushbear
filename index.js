const request = require('request');


if (!process.env.SENDKEY) {
  console.log("no send key");
  process.exit(2);
} else {
  var sendkey = process.env.SENDKEY;
}

var name = process.env.DRONE_REPO_NAME;
var status = process.env.DRONE_BUILD_STATUS;
var commit = process.env.DRONE_COMMIT_SHA;
var link = process.env.DRONE_BUILD_LINK;


  var encodedText  = encodeURIComponent(`Building of ${name} is ${status}`);
  var encodedDesp =  encodeURIComponent(`
  ## ${link}: ${status}

  + commit: ${commit}
  `);

request({
  uri: `https://pushbear.ftqq.com/sub?sendkey=${sendkey}&text=${encodedText}&desp=${encodedDesp}`,
  method: 'GET',
}, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    var result = JSON.parse(body);
    console.log(result.data);
  } else {
    console.log(err);
  }
});
