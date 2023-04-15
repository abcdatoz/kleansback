 const db = require('../models')
 const Estado = db.estado




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getEstado = async (req,res,next ) => {


    const result = await Estado
                        .findAll({order: [['nombre', 'ASC']]})                        
                        .catch(next)



    return res.status(status.success).send(result)    

}

const createEstado = async(req,res,next)=> {
    const {clave, nombre}  = req.body
      
    if( isEmpty(clave) 
        || isEmpty(nombre)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Estado.create({
        clave: clave,
        nombre: nombre,
        activo: true,        
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateEstado = async (req,res,next) => {
    
    const {nombre, clave} = req.body

    if (isEmpty(nombre) || isEmpty(clave) ){
        errorMessage.error = 'El campo clave y nombre  son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const registro = await Estado.findByPk(req.params.id).catch(next)

    if (registro) {

        const result =  await registro.update(
            {
                nombre: nombre,
                clave: clave                
            })
            .catch(next)
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}
    
    
const deleteEstado = async(req,res,next)=>{
    
    const result = await Estado.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}




module.exports = {
    getEstado: getEstado,
    createEstado: createEstado,
    updateEstado: updateEstado,
    deleteEstado: deleteEstado
}
