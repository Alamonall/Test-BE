const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Student, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
      Attendance.belongsTo(models.Subject, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
    }
  }

  Attendance.init(
    {
      Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      From: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Until: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Attendance',
      timestamps: false,
    },
  );

  return Attendance;
};
