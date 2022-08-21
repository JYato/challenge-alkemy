import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import db from "../config/db.js";

const Transaction = db.define('transactions',{
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        get() {
            const res = new Date(this.getDataValue('date')).toISOString().split('T')[0];
            return res;
        }
    },
    type: {
        type: DataTypes.BOOLEAN, // 0: expense, 1: income
        allowNull: false
    }
},{
    scopes: {
        withOutFields: {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    }
})

export default Transaction;