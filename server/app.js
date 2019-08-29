import express from 'express';
import Connection from 'sequelize-connect';
import path from 'path';

const PORT = 3000;

async function connect() {
  const discover = [path.join(__dirname, '/models')];
  await new Connection(
    'xtodo',
    'root',
    '', {
      dialect: 'mysql',
    },
    discover,
  );
}

(async function init() {
  try {
    await connect();
    const app = express();
    app.get('*', (_, res) => {
      res.json('hello');
    });

    app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
  } catch (error) {
    console.log('Error while connecting to db', error);
  }
}());
