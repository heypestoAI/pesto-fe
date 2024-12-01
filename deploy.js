var ghpages = require('gh-pages');

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: 'https://github.com/chewchoo/pesto-fe-build.git',
    user: {
        name: 'Ashi bot',
        email: 'bot@heypesto.ai'
      }
}, (err) => {
    console.error('Error: ' + error);
}).then((...args) => {console.log('Success: ' + args)});