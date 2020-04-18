import Connection from 'sequelize-connect';
import Sequelize from 'sequelize';
import moment from 'moment';

const { Op } = Sequelize;
const taskController = {};

taskController.addTask = async (req, res, next) => {
  const db = new Connection();
  const {
    title,
    description,
    dueBy,
    dueWholeDay,
    projectId,
    status,
  } = req.body;
  const task = {
    title,
    description,
    dueBy,
    dueWholeDay,
    ProjectId: projectId,
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
  const todayDate = today.toDate();
  const minDate = today.subtract(7, 'days').toDate();

  // fetch everything from last 7 days and any open tasks beyond that
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
      include: {
        model: db.models.Project,
      }
    });
    const dateKeys = new Map();
    const oldTasks = [];
    const noDueDateTasks = [];
    const reduced = tasks.reduce((t, task) => {
      if (!task.dueBy || task.dueBy == null) {
        noDueDateTasks.push(task);
        return t;
      }
      const day = moment(task.dueBy).startOf('day');
      if (!day.isValid()) {
        noDueDateTasks.push(task);
        return t;
      }
      const key = day.local().format('YYYY-MM-DD');
      if (day < todayDate) {
        oldTasks.push(task);
        return t;
      }
      if (!t[key]) {
        t[key] = [];
        dateKeys.set(key, day);
      }
      t[key].push(task);
      return t;
    }, {});
    const latestTasks = Object.keys(reduced).map((key) => (
      {
        date: dateKeys.get(key),
        tasks: reduced[key],
      }
    ));
    latestTasks.sort((a, b) => a.date.isAfter(b.date));
    res.json({
      oldTasks,
      noDueDateTasks,
      latestTasks,
    });
  } catch (error) {
    next(error);
  }
};

taskController.deleteTask = async (req, res, next) => {
  const db = new Connection();
  const { taskId } = req.params;

  try {
    await db.models.Task.destroy({
      where: {
        id: taskId,
      },
    });
    res.json('success');
  } catch (error) {
    next(error);
  }
};

taskController.updateTask = async (req, res, next) => {
  const db = new Connection();
  const { taskId } = req.params;

  try {
    const originalTask = await db.models.Task.findOne({
      where: {
        id: taskId,
      },
    });
    const task = req.body;
    const {
      title, dueBy, description, ProjectId, status,
    } = task;
    originalTask.title = typeof title === 'undefined' ? originalTask.title : title;
    originalTask.dueBy = typeof dueBy === 'undefined' ? originalTask.dueBy : dueBy;
    originalTask.description = typeof description === 'undefined' ? originalTask.description : description;
    originalTask.ProjectId = typeof ProjectId === 'undefined' ? originalTask.ProjectId : ProjectId;
    originalTask.status = status || originalTask.status;
    const saved = await originalTask.save();
    res.json(saved);
  } catch (error) {
    next(error);
  }
};

export default taskController;
