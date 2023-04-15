const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
 

// app.use(express.static('public'))
app.use(express.static('public'))

let corsOptions = { origin: false }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
const Role = db.role;
const Estado = db.estado;



    // db.sequelize.sync({force:true})
    //  .then(()=>{ 
    //      console.log("Drop and Resync Db");        
    //       initial()
    //  });


 


app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();   
});

 


app.use('/api/resources',express.static(__dirname + '/public/uploads'));

app.get('/',(req,res)=>{ res.json({messsage:'Welcome to the jungle...'}) })

require('./app/routes/authRoutes')(app)
require('./app/routes/userRoutes')(app)

require('./app/routes/estadoRoutes')(app)
require('./app/routes/municipioRoutes')(app)
require('./app/routes/categoriaRoutes')(app)
require('./app/routes/clienteRoutes')(app)
require('./app/routes/clienteDatosEntregaRoutes')(app)





app.use( (error, req, res, next) => {
        return res.status(500).json({ error: error.toString() });
});
   


const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)    
})







function initial(){
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"moderator"
    });

    Role.create({
        id:3,
        name:"admin"
    });

    Estado.create({
        clave: 'ver',
        nombre: 'Veracruz',
        activo: 1,       
    });
    
    Estado.create({
        clave: 'pue',
        nombre: 'Puebla',
        activo: 1,       
    });

    Estado.create({
        clave: 'oax',
        nombre: 'Oaxaca',
        activo: 1,       

    });

}