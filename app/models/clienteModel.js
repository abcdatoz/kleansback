module.exports = (sequelize, Sequelize) => {

    const Cliente = sequelize.define("clientes",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        nombre:     { type: Sequelize.STRING },
        apellidos:     { type: Sequelize.STRING },
        razonSocial:     { type: Sequelize.STRING },
        rfc:     { type: Sequelize.STRING },
        calle:     { type: Sequelize.STRING },
        numeroExterior:     { type: Sequelize.STRING },
        referencia:     { type: Sequelize.STRING },
        colonia:     { type: Sequelize.STRING },
        localidad:     { type: Sequelize.STRING },
        cp:     { type: Sequelize.STRING },
        whatsapp:     { type: Sequelize.STRING },
        telefono:     { type: Sequelize.STRING },
        email:     { type: Sequelize.STRING },
        activo:     { type: Sequelize.INTEGER },                 
        categoriaId:        { type: Sequelize.UUID, allowNull: false },        
        estadoId:        { type: Sequelize.UUID, allowNull: false },       
        municipioId:        { type: Sequelize.UUID, allowNull: false },        
        userId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return Cliente;
    
}