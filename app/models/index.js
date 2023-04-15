const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/userModel.js")(sequelize, Sequelize);
db.role = require("../models/roleModel.js")(sequelize, Sequelize);

db.estado = require('../models/estadoModel.js')(sequelize, Sequelize);
db.municipio = require('../models/municipioModel.js')(sequelize, Sequelize);
db.categoria = require('../models/categoriaModel.js')(sequelize, Sequelize);

db.cliente = require('../models/clienteModel.js')(sequelize, Sequelize);
db.clienteDatosEntregas = require('../models/clienteDatosEntregaModel.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user,{ 
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});


db.user.hasMany(db.municipio,       { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.categoria,       { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.cliente,         { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.clienteDatosEntregas, { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });

db.estado.hasMany(db.municipio,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.estado.hasMany(db.cliente,       { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.estado.hasMany(db.clienteDatosEntregas,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });

db.municipio.hasMany(db.cliente,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.municipio.hasMany(db.clienteDatosEntregas,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });

db.categoria.hasMany(db.cliente,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' })



db.categoria.belongsTo(db.user);

db.municipio.belongsTo(db.user);
db.municipio.belongsTo(db.estado);

db.clienteDatosEntregas.belongsTo(db.estado);
db.clienteDatosEntregas.belongsTo(db.municipio);
db.clienteDatosEntregas.belongsTo(db.user);

db.cliente.belongsTo(db.estado);
db.cliente.belongsTo(db.municipio);
db.cliente.belongsTo(db.categoria);
db.cliente.belongsTo(db.user); 



db.ROLES= ["user","admin","moderator"];

module.exports = db;