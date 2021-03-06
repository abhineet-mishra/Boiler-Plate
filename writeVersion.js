const fs = require('fs');
const coPackage = require('./package.json');
const sem = require('semver');
const path = require('path');
const execSync = require('child_process').execSync;
const json = require('json');

const run = (command, options) => execSync(command, {
  encoding: 'utf8',
  ...options
});

// const getRootPath = () => run('git rev-parse --show-cdup').trim();
// const getPackageJsonPath = path.join(process.cwd(), `${ getRootPath() }package.json`);
// const getPackageLockJsonPath = path.join(process.cwd(), `${ getRootPath() }package-lock.json`, );
console.log('This is the current version --> ', coPackage.version);
const standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log('To which release version would you like to update?');

standard_input.on('data', function(data) {
  if (data === 'exit\n') {
    console.log('User input complete, program exit.');
    process.exit();
  } else {
    const inp = data.split('\n');
    if (inp[0].includes('rc') || sem.satisfies(`${inp[0]}`, `>=${coPackage.version}`)) {
      const version = inp[0];
      console.log('This is the final version', version);
      let cmd = `json -I -f package.json -e 'this.version="${version}"'`;
      run(cmd);
      cmd = `json -I -f ./locales/package.json -e 'this.version="${version}"'`;
      run(cmd);
      run('rm -f .git/index.lock');
      const changes = run('git status --porcelain');
      const vTag = 'v' + `${version}`;
      const branch = run('git rev-parse --abbrev-ref HEAD');
      if (changes) {
        run('rm -f .git/index.lock');
        run('git add .');
        run(`git commit -m "Adding updated packageJson versioning"`);
        run(`git tag -a "${vTag}" -m "${vTag}"`);
        run(`git push --tags`);
        run(`git push origin ${branch}`);
      }
      process.exit();
    } else {
      console.log('Entered version is not correct. Please re-enter');
    }
  }
});
