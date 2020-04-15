export default function createTaskModel(sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project: DataTypes.STRING,
    description: DataTypes.STRING,
    dueBy: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM,
      values: ['OPEN', 'COMPLETED', 'POSTPONED', 'CANCELLED'],
      defaultValue: 'OPEN',
    },
  }, {
    timestamps: false,
  });
  return Task;
}
