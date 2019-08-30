const Connection = require('sequelize-connect');

const taskController = {};

taskController.addTask = async (req, res, next) => {
  const db = new Connection();
  const {
    title, description, dueBy, dueWholeDay, project,
  } = req.body;
  const task = {
    title,
    description,
    dueBy,
    dueWholeDay,
    project,
  };

  console.log(task);

  try {
    const createdTask = await db.models.Task.create(task);
    res.json(createdTask);
  } catch (error) {
    next(error);
  }
};

export default taskController;
