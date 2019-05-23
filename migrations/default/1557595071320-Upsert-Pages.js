import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'login',
      title: 'Login - BoilerplateJS™',
      sections: '["@boilerplatejs/demo:Login"]'
    });

    await Page.create({
      route: 'dashboard',
      title: 'Account - BoilerplateJS™',
      sections: '["@boilerplatejs/demo:Dashboard"]',
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
