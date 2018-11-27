const fs = require('fs');
const coPackage = require('./package.json');
const sem = require('semver');
//const writeJsonFile = require('write-json-file');
const path = require('path');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const json = require('json');
const readline = require('readline');

const run = (command, options) => execSync(command, {
  encoding: 'utf8',
  ...options
});
let verson = JSON.stringify(coPackage.version);
console.log("This is the current version --> ", verson);
let version = coPackage.version;
const getRootPath = () => run('git rev-parse --show-cdup').trim();
const getPackageJsonPath = path.join(process.cwd(), `${ getRootPath() }package.json`);
const getPackageLockJsonPath = () => path.join(process.cwd(), `${ getRootPath() }package-lock.json`, );

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What version you wish to upgrade? ', (answer) => {
  console.log('Thank you for your valuable feedback:', answer);

  rl.close();
});
