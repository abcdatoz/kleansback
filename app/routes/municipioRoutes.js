const { authJwt } = require('../middleware')
const x = require('../controllers/municipioController')



module.exports = function(app) {
    app.get('/api/municipios/',[authJwt.verifyToken], x.getMunicipios)    
    app.post('/api/municipios/',[authJwt.verifyToken],x.createMunicipio)
    app.put('/api/municipios/:id',[authJwt.verifyToken], x.updateMunicipio)
    app.delete('/api/municipios/:id',[authJwt.verifyToken],x.deleteMunicipio)
}