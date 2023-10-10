import  Express  from "express";
import handlebars from 'express-handlebars'
import { viewsPath , publicPath, dataPath } from "./utils.js";
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io";
import { ProductManager } from "../manager/ProductManager.js";


const mercado = new ProductManager(dataPath);
const app = Express()

//archvios staticos
app.use(Express.static(publicPath));


//motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', viewsPath);
app.set('view engine','handlebars');




//servidor
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
const server = app.listen(8080, ()=>{console.log('server listen')})



//socket io
const io = new Server(server);

//routes
app.use('/', viewsRouter)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', io.engine.clientsCount);

    socket.on('agregarProducto', async (tittle, price, stock)=>{
        if (!tittle || !price || !stock) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        console.log('producto recibido')
        const newProduct = await mercado.addProduct(tittle, price, stock);
        io.emit('mostrartodo', await mercado.getProduct());
    })
    
    socket.on('eliminarProducto',async (productId)=>{
        const id = parseInt(productId)
        const borrar = await mercado.deleteProduct(id)
        console.log('borrando el producto con id: ' + id)
        io.emit('mostrartodo', await mercado.getProduct());
    })
    
});