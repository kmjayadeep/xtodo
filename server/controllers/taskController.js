import Connection from 'sequelize-connect';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;
const taskController = {};

taskController.addTask = async (req, res, next) => {
  const db = new Connection();
  const {
    title,
    description,
    dueBy,
    dueWholeDay,
    project,
  } = req.body;
  const task = {
    title,
    description,
    dueBy,
    dueWholeDay,
    project,
  };

  try {
    const createdTask = await db.models.Task.create(task);
    res.json(createdTask);
  } catch (error) {
    next(error);
  }
};

taskController.fetchTasks = async (_, res, next) => {
  const db = new Connection();

  const minDate = new Date();

  try {
    const tasks = await db.models.Task.findAll({
      where: {
        [Op.or]: [{
          dueBy: {
            [Op.gt]: minDate,
          },
        }, {
          status: {
            [Op.ne]: 'CLOSED',
          },
        }],
      },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export default taskController;
