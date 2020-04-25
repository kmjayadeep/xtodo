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

  if (!title) {
    return next('title cannot be emoty');
  }

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

  try {
    const tasksPromise = db.models.Task.findAll({
      where: {
        dueBy: {
          [Op.gte]: today,
        },
      },
      // include: {
      //   model: db.models.Project,
      // },
    });

    const oldTasksPromise = db.models.Task.findAll({
      where: {
        dueBy: {
          [Op.lt]: today,
        },
      },
      order: [
        ['dueBy', 'ASC'],
      ],
    });

    const noDueDateTasksPromise = db.models.Task.findAll({
      where: {
        dueBy: {
          [Op.eq]: null,
        },
      },
    });

    const overDueTasksPromise = db.models.Task.findAll({
      where: {
        dueBy: {
          [Op.lt]: today,
        },
        status: {
          [Op.ne]: 'COMPLETED',
        },
      },
      order: [
        ['dueBy', 'ASC'],
      ],
    });

    const [tasks, oldTasks, noDueDateTasks, overDueTasks] = await Promise.all([
      tasksPromise,
      oldTasksPromise,
      noDueDateTasksPromise,
      overDueTasksPromise,
    ]);

    const dateKeys = new Map();
    const reduced = tasks.reduce((t, task) => {
      const day = moment(task.dueBy).startOf('day');
      const key = day.local().format('YYYY-MM-DD');
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
      overDueTasks,
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
