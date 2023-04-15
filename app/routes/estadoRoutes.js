const { authJwt} = require('../middleware')
const x =  require('../controllers/estadoController')

module.exports = function(app){

    app.get('/api/estados/', x.getEstado)
    app.post('/api/estados/',[authJwt.verifyToken],x.createEstado)
    app.put('/api/estados/:id',[authJwt.verifyToken], x.updateEstado)
    app.delete('/api/estados/:id',[authJwt.verifyToken],x.deleteEstado)

}