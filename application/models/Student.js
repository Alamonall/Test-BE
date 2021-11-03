const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.hasMany(models.Attendance, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
				as: 'Days',
      });
      Student.belongsTo(models.Academy, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
    }
  }

  Student.init(
    {
      Firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      Lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      Email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 255] },
      },
    },
    {
      sequelize,
      modelName: 'Student',
      timestamps: false,
    },
  );
  return Student;
};
