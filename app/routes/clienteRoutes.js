const { authJwt } = require('../middleware')
const x = require('../controllers/clienteController')



module.exports = function(app) {
    app.get('/api/clientes/',[authJwt.verifyToken], x.getClientes)    
    app.post('/api/clientes/',[authJwt.verifyToken],x.createCliente)
    app.put('/api/clientes/:id',[authJwt.verifyToken], x.updateCliente)
    app.delete('/api/clientes/:id',[authJwt.verifyToken],x.deleteCliente)
}