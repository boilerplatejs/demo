import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Layout, Session} = getModels();

    const LayoutId = await Layout.findAll({ where: { enabled: true }, limit: 1, order: [['id', 'DESC']] })
        .then(records => records.map(record => record.dataValues))
        .then(records => records[0].id);

    await Session.create({
      LayoutId,
      service: '@machete-platform/demo-bundle'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Session} = getModels();

    await Session.destroy({
      where: {
        service: '@machete-platform/demo-bundle'
      }
    });
  }
}
