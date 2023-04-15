const { authJwt } = require('../middleware')
const x = require('../controllers/clienteDatosEnregaController')

module.exports = function(app) {
    app.get('/api/clientesDatosEntrega/',[authJwt.verifyToken], x.getDatosEntrega)    
    app.post('/api/clientesDatosEntrega/',[authJwt.verifyToken],x.createDatosEntrega)
    app.put('/api/clientesDatosEntrega/:id',[authJwt.verifyToken], x.updateDatosEntrega)
    app.delete('/api/clientesDatosEntrega/:id',[authJwt.verifyToken],x.deleteDatosEntrega)
}