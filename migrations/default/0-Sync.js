export default class {
  static async up(models, sequelize, DataTypes) {
    return await sequelize.sync();
  }

  static async down(models, sequelize, DataTypes) {}
}
