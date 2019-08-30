export default function createTaskModel(sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project: DataTypes.STRING,
    description: DataTypes.STRING,
    dueBy: DataTypes.DATE,
    dueWholeDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
      defaultValue: 'OPEN',
    },
  }, {
    timestamps: false,
    associate(models) {
      console.log(models);
    },
  });
  return Task;
}
