const Drone = require('drone-node');
const plugin = new Drone.Plugin();
const request = require('request');


plugin.parse().then((params) => {

  // gets build and repository information for
  // the current running build
  const build = params.build;
  const repo  = params.repo;
  const workspace = params.workspace;

  // gets plugin-specific parameters defined in
  // the .drone.yml file
  const vargs = params.vargs;

  if (!vargs.sendkey) {
    console.log('sendkey not exist!');
    process.exit(2);
  }

  var encodedText  = encodeURIComponent(`Building of ${repo.name} is ${build.status}`);
  var encodedDesp =  encodeURIComponent(`
  ## ${repo.clone_url}: ${build.status}

  + branch: ${build.branch}
  + commit: ${build.commit}
  + event: ${build.push}
  + started_at : ${new Date(build.started_at)}
  + finished_at: ${new Date(build.finished_at)}
  `);

  request({
    uri: `https://pushbear.ftqq.com/sub?sendkey=${vargs.sendkey}&text=${encodedText}&desp=${encodedDesp}`,
    method:'GET',
  },(err, response, body)=>{
    if (!err && response.statusCode === 200) {
      var result = JSON.parse(body);
      if (result.code !== "0") {
        console.log(result.message);
      } else {
        console.log(result.message);
      }
  } else {
      console.log(err);
  }
  });
});
