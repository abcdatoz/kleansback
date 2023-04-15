 const db = require('../models')
 const Cliente = db.cliente




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getClientes = async (req,res,next ) => {

    const result = await Cliente
                        .findAll({order: [['nombre', 'ASC']]})                        
                        .catch(next)
  
    return res.status(status.success).send(result)    

}

const createCliente = async(req,res,next)=> {    
        
    const { nombre, 
            apellidos,
            razonSocial, 
            rfc, 
            calle, 
            numeroExterior,  
            referencia,
            colonia,
            localidad,
            cp,
            whatsapp,
            telefono,
            email,
            categoria,
            estado,
            municipio
        }  = req.body
          
    if( isEmpty(nombre) || isEmpty(apellidos) || isEmpty(razonSocial) ||
        isEmpty(rfc) || isEmpty(calle) || isEmpty(numeroExterior) ||
        isEmpty(referencia) || isEmpty(colonia) || isEmpty(localidad) ||
        isEmpty(cp) || isEmpty(whatsapp) || isEmpty(telefono) ||
        isEmpty(email) || isEmpty(categoria) || isEmpty(estado) || isEmpty(municipio))
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Cliente.create({        
        nombre: nombre,            
        apellidos: apellidos,
        razonSocial: razonSocial,
        rfc: rfc,
        calle: calle,
        numeroExterior: numeroExterior,
        referencia: referencia,
        colonia: colonia,
        localidad: localidad,
        cp: cp,
        whatsapp: whatsapp,
        telefono: telefono,
        email: email,
        categoriaId: categoria,
        estadoId: estado,
        municipioId: municipio,
        activo: 1,        
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateCliente = async (req,res,next) => {
    
    const { nombre, 
        apellidos,
        razonSocial, 
        rfc, 
        calle, 
        numeroExterior,  
        referencia,
        colonia,
        localidad,
        cp,
        whatsapp,
        telefono,
        email,
        categoria,
        estado,
        municipio
    }  = req.body

    if( isEmpty(nombre) || isEmpty(apellidos) || isEmpty(razonSocial) ||
        isEmpty(rfc) || isEmpty(calle) || isEmpty(numeroExterior) ||
        isEmpty(referencia) || isEmpty(colonia) || isEmpty(localidad) ||
        isEmpty(cp) || isEmpty(whatsapp) || isEmpty(telefono) ||
        isEmpty(email) || isEmpty(categoria) || isEmpty(estado) || isEmpty(municipio))
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }



    const registro = await Cliente.findByPk(req.params.id).catch(next)

    if (registro) {

        const result =  await registro.update(
            {
                nombre: nombre,            
                apellidos: apellidos,
                razonSocial: razonSocial,
                rfc: rfc,
                calle: calle,
                numeroExterior: numeroExterior,
                referencia: referencia,
                colonia: colonia,
                localidad: localidad,
                cp: cp,
                whatsapp: whatsapp,
                telefono: telefono,
                email: email,
                categoriaId: categoria,
                estadoId: estado,
                municipioId: municipio,                
                userId: req.userId
            })
            .catch(next)
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}
    
    
const deleteCliente = async(req,res,next)=>{
    
    const result = await Cliente.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}




module.exports = {
    getClientes: getClientes,
    createCliente: createCliente,
    updateCliente: updateCliente,
    deleteCliente: deleteCliente    
}
