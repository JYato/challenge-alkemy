import Category from "./Category.js"
import Transaction from "./Transaction.js"
import User from "./User.js"

Transaction.belongsTo(User, {foreignKey: 'userId'});
Transaction.belongsTo(Category, {foreignKey: 'categoryId'});
Category.belongsTo(User, {foreignKey: 'userId'});

export {
    User,
    Transaction,
    Category
}