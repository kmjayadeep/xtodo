import express from 'express';
import Connection from 'sequelize-connect';
import path from 'path';
import bodyParser from 'body-parser';
import template from './template';

import taskController from './controllers/taskController';
import projectController from './controllers/projectController';
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
    app.get('/api/project', projectController.fetchProjects);
    app.post('/api/project', projectController.addProject);
    app.get('/api/task', taskController.fetchTasks);
    app.post('/api/task', taskController.addTask);
    app.use(errorHandler);

    app.get('/', (_, res) => {
      res.send(template());
    });

    app.use(express.static('public'));

    app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
  } catch (error) {
    console.log('Error while connecting to db', error);
  }
}());
