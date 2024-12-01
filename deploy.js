var ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/chewchoo/pesto-fe-build.git'
}, (err) => {
    console.error('Error: ' + error);
}).then((...args) => {console.log('Success: ' + args)});