require('dotenv').config();

const app = require('./app');
require('./database');


let main = () => {
  let port = app.get('port');
  app.listen(port, () => console.log('Server running on port: ' + port));
}

main();
