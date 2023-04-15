 const db = require('../models')
 const Categoria = db.categoria




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getCategorias = async (req,res,next ) => {

    const result = await Categoria
                        .findAll({order: [['nombre', 'ASC']]})                        
                        .catch(next)
  
    return res.status(status.success).send(result)    

}

const createCategoria = async(req,res,next)=> {    
        
    const {clave, nombre}  = req.body
          
    if( isEmpty(nombre) || isEmpty(clave))
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Categoria.create({        
        clave: clave,            
        nombre: nombre,            
        activo: 1,        
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateCategoria = async (req,res,next) => {
    
    const {clave, nombre} = req.body
    
    if (isEmpty(nombre) ){
        errorMessage.error = 'El campo nombre es requerido'
        return res.status(status.bad).send(errorMessage)
    }

     const registro = await Categoria.findByPk(req.params.id).catch(next)
    
     
     if (registro) {
        
        const result = await registro.update({
            clave: clave,
            nombre: nombre
        }).catch(next)

        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}
    
    
const deleteCategoria = async(req,res,next)=>{
    
    const result = await Categoria.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}




module.exports = {
    getCategorias: getCategorias,
    createCategoria: createCategoria,
    updateCategoria: updateCategoria,
    deleteCategoria: deleteCategoria    
}
