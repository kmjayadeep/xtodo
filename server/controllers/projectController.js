
import Connection from 'sequelize-connect';
import Sequelize from 'sequelize';

const { Op } = Sequelize;
const projectController = {};

projectController.addProject = async (req, res, next) => {
  const db = new Connection();
  const {
    title,
    description,
    color,
  } = req.body;
  const project = {
    title,
    description,
    color,
  };

  try {
    const createdProject = await db.models.Project.create(project);
    res.json(createdProject);
  } catch (error) {
    next(error);
  }
};

projectController.fetchProjects = async (_, res, next) => {
  const db = new Connection();

  try {
    const projects = await db.models.Project.findAll({});
    res.json(projects);
  } catch (error) {
    next(error);
  }

};

export default projectController;
