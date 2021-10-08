const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsTo(models.Academy, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
      Subject.hasMany(models.Attendance, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
    }
  }

  Subject.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        validate: { notEmpty: true },
      },
    },
    {
      sequelize,
      modelName: 'Subject',
      timestamps: false,
    },
  );

  return Subject;
};
