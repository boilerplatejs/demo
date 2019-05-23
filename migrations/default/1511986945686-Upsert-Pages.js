import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'chat',
      title: 'Chat - BoilerplateJS™',
      page: '@boilerplatejs/demo:Chat',
      sections: '["@boilerplatejs/demo:Chat"]',
      auth: true
    });

    await Page.create({
      route: 'survey',
      title: 'Survey - BoilerplateJS™',
      page: '@boilerplatejs/demo:Survey',
      sections: '["@boilerplatejs/demo:Survey"]'
    });

    await Page.create({
      route: 'widgets',
      title: 'Widgets - BoilerplateJS™',
      page: '@boilerplatejs/demo:Widgets',
      sections: '["@boilerplatejs/demo:Widgets"]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'chat',
        title: 'Chat - BoilerplateJS™',
        page: '@boilerplatejs/demo:Chat',
        sections: '["@boilerplatejs/demo:Chat"]',
        auth: true
      }
    });

    await Page.destroy({
      where: {
        route: 'survey',
        title: 'Survey - BoilerplateJS™',
        page: '@boilerplatejs/demo:Survey',
        sections: '["@boilerplatejs/demo:Survey"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'widgets',
        title: 'Widgets - BoilerplateJS™',
        page: '@boilerplatejs/demo:Widgets',
        sections: '["@boilerplatejs/demo:Widgets"]'
      }
    });
  }
}
