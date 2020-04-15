export default function createProjectModel(sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    color: {
      type: DataTypes.STRING,
      defaultValue: '#ffffff',
    }
  }, {
    timestamps: false,
  });

  Project.associate = (models) => {
    Project.hasMany(models.Task);
    models.Task.belongsTo(Project);
  };

  return Project;
}
