import { Sequelize } from 'sequelize'

const user = 'me'
const host = 'localhost'
const database = 'api'
const password = 'password'
const port = '5432'

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  });

export default sequelize;