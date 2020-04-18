import express from 'express';
import Connection from 'sequelize-connect';
import path from 'path';
import bodyParser from 'body-parser';
import template from './template';

import taskController from './controllers/taskController';
import projectController from './controllers/projectController';
import errorHandler from './middlewares/errorHandler';

const PORT = 3000;

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'xtodo';

async function connect() {
  const discover = [path.join(__dirname, '/models')];
  const matcher = () => true;
  await new Connection(
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
      dialect: 'mysql',
      host: MYSQL_HOST,
      retry: {
        max: 3,
        timeout: 10000,
        backoffBase: 5000,
      },
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
    app.delete('/api/project/:projectId', projectController.deleteProject);

    app.get('/api/task', taskController.fetchTasks);
    app.post('/api/task', taskController.addTask);
    app.post('/api/task/:taskId', taskController.updateTask);
    app.delete('/api/task/:taskId', taskController.deleteTask);

    app.use(errorHandler);

    app.use(express.static('public'));

    app.get('*', (_, res) => {
      res.send(template());
    });


    app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
  } catch (error) {
    console.log('Error while connecting to db', error);
  }
}());
