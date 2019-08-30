import Connection from 'sequelize-connect';
import Sequelize from 'sequelize';
import moment, { min } from 'moment';

const { Op } = Sequelize;
const taskController = {};

taskController.addTask = async (req, res, next) => {
  const db = new Connection();
  const {
    title,
    description,
    dueBy,
    dueWholeDay,
    project,
    status,
  } = req.body;
  const task = {
    title,
    description,
    dueBy,
    dueWholeDay,
    project,
    status,
  };

  try {
    const createdTask = await db.models.Task.create(task);
    res.json(createdTask);
  } catch (error) {
    next(error);
  }
};

// fetch tasks from last 7 days. Older tasks are shown only if it is not closed
taskController.fetchTasks = async (_, res, next) => {
  const db = new Connection();

  const today = moment().startOf('day');
  const minDate = today.subtract(7, 'days').toDate();

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
    const reduced = tasks.reduce((t, task) => {
      if (!task.dueBy) {
        t.noDueDate.push(task);
        return t;
      }
      const day = moment(task.dueBy).startOf('day');
      let key;
      if (task.dueBy < minDate) {
        key = 'older';
      } else {
        key = day.local().format('YYYY-MM-DD');
      }
      if (!t[key]) {
        t[key] = [];
      }
      t[key].push(task);
      return t;
    }, {
      noDueDate: [],
    });
    res.json(reduced);
  } catch (error) {
    next(error);
  }
};

export default taskController;
