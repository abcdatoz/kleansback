 const db = require('../models')
 const ClienteDatosEntrega = db.clienteDatosEntregas




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getDatosEntrega = async (req,res,next ) => {

    const result = await ClienteDatosEntrega
                        .findAll({order: [['calle', 'ASC']]})                        
                        .catch(next)
  
    return res.status(status.success).send(result)    

}

const createDatosEntrega = async(req,res,next)=> {    
        
    const { calle, 
            numeroExterior,  
            referencia,
            colonia,
            localidad,
            coordenadas,            
            telefono,
            datosEntregaDomicilio,
            asignacionRuta,
            cliente,
            estado,
            municipio
        }  = req.body
           
    if( isEmpty(calle) || isEmpty(numeroExterior) ||
        isEmpty(referencia) || isEmpty(colonia) || isEmpty(localidad) || isEmpty(coordenadas) ||
        isEmpty(telefono) ||     isEmpty(datosEntregaDomicilio) || isEmpty(asignacionRuta) || 
        isEmpty(estado) || isEmpty(municipio) || isEmpty(cliente)  )
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await ClienteDatosEntrega.create({                
        calle: calle,
        numeroExterior: numeroExterior,
        referencia: referencia,
        colonia: colonia,
        localidad: localidad,
        coordenadas: coordenadas,        
        telefono: telefono,
        datosEntregaADomicilio: datosEntregaDomicilio,
        asignacionRuta: asignacionRuta,
        estadoId: estado,
        municipioId: municipio,
        clienteId: cliente,
        activo: 1,        
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateDatosEntrega = async (req,res,next) => {
    
    const { calle, 
        numeroExterior,  
        referencia,
        colonia,
        localidad,
        coordenadas,            
        telefono,
        datosEntregaDomicilio,
        asignacionRuta,
        cliente,
        estado,
        municipio
    }  = req.body

    if( isEmpty(calle) || isEmpty(numeroExterior) ||
        isEmpty(referencia) || isEmpty(colonia) || isEmpty(localidad) || isEmpty(coordenadas) ||
        isEmpty(telefono) ||     isEmpty(datosEntregaDomicilio) || isEmpty(asignacionRuta) || 
        isEmpty(estado) || isEmpty(municipio) || isEmpty(cliente)  )
    {
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }



    const registro = await ClienteDatosEntrega.findByPk(req.params.id).catch(next)

    if (registro) {

        const result =  await registro.update(
            {
                calle: calle,
                numeroExterior: numeroExterior,
                referencia: referencia,
                colonia: colonia,
                localidad: localidad,
                coordenadas: coordenadas,        
                telefono: telefono,
                datosEntregaADomicilio: datosEntregaDomicilio,
                asignacionRuta: asignacionRuta,
                estadoId: estado,
                municipioId: municipio,                
            })
            .catch(next)
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}
    
    
const deleteDatosEntrega = async(req,res,next)=>{
    
    const result = await ClienteDatosEntrega.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}




module.exports = {
    getDatosEntrega: getDatosEntrega,
    createDatosEntrega: createDatosEntrega,
    updateDatosEntrega: updateDatosEntrega,
    deleteDatosEntrega: deleteDatosEntrega
}
