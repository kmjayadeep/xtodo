export default function createTaskModel(sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    dueBy: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
    },
  }, {
    timestamps: false,
    associate(models) {
      console.log(models);
    },
  });
  return Task;
}
