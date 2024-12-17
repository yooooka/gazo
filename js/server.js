var cnct = require('connect');
cnct().use(cnct.static('/Users/yoshikow/workspace/gazo')).listen(3000);
console.log('Server has started!');