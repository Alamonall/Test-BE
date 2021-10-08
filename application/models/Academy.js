const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Academy extends Model {
    static associate(models) {
      Academy.hasMany(models.Student, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
      Academy.hasMany(models.Subject, {
        foreignKey: {
          allowNull: false,
          onDelete: 'restrict',
        },
      });
    }
  }

  Academy.init(
    {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      sequelize,
      modelName: 'Academy',
      timestamps: false,
    },
  );
  return Academy;
};
