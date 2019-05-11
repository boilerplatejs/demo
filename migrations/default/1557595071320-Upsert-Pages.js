import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'login',
      title: 'Login - Machete™',
      sections: '["@machete-platform/demo-bundle:Login"]'
    });

    await Page.create({
      route: 'dashboard',
      title: 'Account - Machete™',
      sections: '["@machete-platform/demo-bundle:Dashboard"]',
      auth: true
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'login'
      }
    });

    await Page.destroy({
      where: {
        route: 'dashboard'
      }
    });
  }
}
