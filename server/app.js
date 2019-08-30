import express from 'express';
import Connection from 'sequelize-connect';
import path from 'path';
import bodyParser from 'body-parser';

import taskController from './controllers/taskController';
import errorHandler from './middlewares/errorHandler';

const PORT = 3000;

async function connect() {
  const discover = [path.join(__dirname, '/models')];
  const matcher = () => true;
  await new Connection(
    'xtodo',
    'root',
    '', {
      dialect: 'mysql',
    },
    discover,
    matcher,
  );
}

(async function init() {
  try {
    await connect();
    const app = express();
    app.use(bodyParser.json());
    app.post('/api/task', taskController.handlePost);
    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
  } catch (error) {
    console.log('Error while connecting to db', error);
  }
}());
