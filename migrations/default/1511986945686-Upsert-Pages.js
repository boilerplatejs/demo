import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'chat',
      title: 'VitruvianTech - Chat',
      page: '@machete-platform/demo-bundle:Chat',
      sections: '["@machete-platform/demo-bundle:Chat"]',
      auth: true
    });

    await Page.create({
      route: 'survey',
      title: 'VitruvianTech - Survey',
      page: '@machete-platform/demo-bundle:Survey',
      sections: '["@machete-platform/demo-bundle:Survey"]'
    });

    await Page.create({
      route: 'widgets',
      title: 'VitruvianTech - Widgets',
      page: '@machete-platform/demo-bundle:Widgets',
      sections: '["@machete-platform/demo-bundle:Widgets"]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'chat',
        title: 'VitruvianTech - Chat',
        page: '@machete-platform/demo-bundle:Chat',
        sections: '["@machete-platform/demo-bundle:Chat"]',
        auth: true
      }
    });

    await Page.destroy({
      where: {
        route: 'survey',
        title: 'VitruvianTech - Survey',
        page: '@machete-platform/demo-bundle:Survey',
        sections: '["@machete-platform/demo-bundle:Survey"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'widgets',
        title: 'VitruvianTech - Widgets',
        page: '@machete-platform/demo-bundle:Widgets',
        sections: '["@machete-platform/demo-bundle:Widgets"]'
      }
    });
  }
}
