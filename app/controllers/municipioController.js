 const db = require('../models')
 const Municipio = db.municipio




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getMunicipios = async (req,res,next ) => {

    const result = await Municipio
                            .findAll({order: [['nombre', 'ASC']]})                        
                            .catch(next)
  
    return res.status(status.success).send(result)    

}

const createMunicipio = async(req,res,next)=> {    
        
    const { nombre, estado}  = req.body
          
    if( isEmpty(nombre) || isEmpty(estado))
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Municipio.create({        
        nombre: nombre,            
        activo: 1,
        estadoId: estado,
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateMunicipio = async (req,res,next) => {
    
    const {nombre, estado} = req.body

    if (isEmpty(nombre) || isEmpty(estado) ){
        errorMessage.error = 'El campo nombre y estado son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const registro = await Municipio.findByPk(req.params.id).catch(next)

    if (registro) {

        const result =  await registro.update(
            {
                nombre: nombre,
                estadoId: estado
            })
            .catch(next)
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}
    
    
const deleteMunicipio = async(req,res,next)=>{
    
    const result = await Municipio.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}




module.exports = {
    getMunicipios: getMunicipios,
    createMunicipio: createMunicipio,
    updateMunicipio: updateMunicipio,
    deleteMunicipio: deleteMunicipio    
}
