import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({path:'.env'})

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER,process.env.BD_PASS ?? '',{
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define:{
        timestamps: true//agrega automaticamente columnas de created y updated
    },
    pool:{
        max:5,//maximo 5 conexiones
        min:0,
        acquire: 30000,//30000milisegundos
        idle: 10000//10 seg
    },
    operatorAliases: false
});

export default db;