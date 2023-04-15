module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ch3st3r",
    DB: "klean",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };