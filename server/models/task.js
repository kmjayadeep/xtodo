export default function createTaskModel(sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    dueBy: DataTypes.DATEONLY,
    status: {
      type: DataTypes.ENUM,
      values: ['OPEN', 'COMPLETED', 'POSTPONED'],
      defaultValue: 'OPEN',
    },
  }, {
    timestamps: false,
  });
  return Task;
}
