import { Router } from "express";
import {ProductManager} from '../../manager/ProductManager.js'
import { dataPath } from "../utils.js";


const mercado = new ProductManager(dataPath);
const router = Router();


router.get('/', async (req, res) => {
    try {
        const coso = await mercado.getProduct();
        return res.render('home', {coso})
    }
    catch(error) {
        console.error(error)
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});


export default router;




