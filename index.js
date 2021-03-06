const request = require('request');


if (!process.env.SENDKEY) {
  console.log("no send key");
  process.exit(2);
} else {
  var sendkey = process.env.SENDKEY.trim();
}

var name = process.env.DRONE_REPO_NAME|| "";
var status = process.env.DRONE_BUILD_STATUS|| "";
var commit = process.env.DRONE_COMMIT_SHA || "";
var link = process.env.DRONE_BUILD_LINK || "" ;
var tag = process.env.DRONE_TAG || "";
var comment = process.env.DRONE_COMMIT_MESSAGE || "";

  var encodedText  = encodeURIComponent(`${name}的构建结果是${status}`);

  var encodedDesp =  encodeURIComponent(`
  ## ${link}: ${status}
  
  TAG是${tag}
  ${comment}

  + commit: ${commit}

  `);

var url=`https://pushbear.ftqq.com/sub?sendkey=${sendkey}&text=${encodedText}&desp=${encodedDesp}`;
console.log(url);
request({
  uri: url,
  method: 'GET',
}, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    var result = JSON.parse(body);
    console.log(result.data);
  } else {
    console.log(err);
  }
});
