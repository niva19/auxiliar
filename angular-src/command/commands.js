// var exec = require('../node_modules/').exec;

// function execute(command, callback) {
//   exec(command, function (error, stdout, stderr) { callback(stdout); });
// };

// function test(){
//     execute(`ipconfig`, output => output);
// }

function mine(){
  return 50
}

function commands(){
  return 100;
}

module.exports = {
  commands: commands,
  mine: mine
}

// module.exports = commands;
// module.exports = ;