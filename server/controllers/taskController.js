const Connection = require('sequelize-connect');

const taskController = {};

taskController.handlePost = async (req, res, next) => {
  const db = new Connection();
  const task = req.body;

  try {
    const createdTask = await db.models.Task.create(task);
    res.json(createdTask);
  } catch (error) {
    next(error);
  }
};

export default taskController;
