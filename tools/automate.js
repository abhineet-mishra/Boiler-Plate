const exec = require('child_process').exec;
const path = require('path');
const execSync = require('child_process').execSync;

const run = (command, options) => execSync(command, {
  encoding: 'utf8',
  ...options
});
const getRootPath = () => run('git rev-parse --show-cdup').trim();
//const getPackageJsonPath = path.join(process.cwd(), `${ getRootPath() }package.json`);   // doing this gets path in a stored in const
const getPackageJsonPath = () => path.join(process.cwd(), `${ getRootPath() }package.json`);
//const getPackageLockJsonPath = path.join(process.cwd(), `${ getRootPath() }package-lock.json`, );
const getPackageLockJsonPath = () => path.join(process.cwd(), `${ getRootPath() }package-lock.json`, );
//console.log("Path of ******\n", getPackageJsonPath);
//console.log("Path of package-lock****\n", getPackageLockJsonPath);
let standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log("\n Please input which release it is: major|minor|patch|release-candidate");

standard_input.on('data', function(data) {
  if (data === 'exit\n') {
    console.log("User input complete, program exit.");
    process.exit();
  } else {
    let inp = data.split('\n');
    // Need to enforce a check here whether
    getUserChoice(inp[0]);
  }
});

function getUserChoice(input) {
  switch (input) {
    case "minor":
    case "patch":
    case "major":
      return bump(input);
      break;
    case "release-candidate":
      return
    default:
      console.log("Default:");
      break;
  }
}

function bump(argument) {
  const cmd = `npm version ${argument} --no-`
  exec(cmd, (e, stdout, stdin) => {
    if (e instanceof Error) {
      console.error(e);
      throw e;
    }
    console.log("stdout ", stdout);
    console.log("stderr ", stdin);
  });
}
//return output;
