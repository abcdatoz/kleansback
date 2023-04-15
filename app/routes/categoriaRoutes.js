const { authJwt } = require('../middleware')
const x = require('../controllers/categoriaController')



module.exports = function(app) {
    app.get('/api/categorias/',[authJwt.verifyToken], x.getCategorias)    
    app.post('/api/categorias/',[authJwt.verifyToken],x.createCategoria)
    app.put('/api/categorias/:id',[authJwt.verifyToken], x.updateCategoria)
    app.delete('/api/categorias/:id',[authJwt.verifyToken],x.deleteCategoria)
}