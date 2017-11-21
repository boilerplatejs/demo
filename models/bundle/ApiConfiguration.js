import {parse, define, Model} from '@vitruvian-tech/app-studio-core/lib/Sequelize';
@define(parse(__filename))

export default class extends Model {
    // Example:
    //
    // id = {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // };
};
