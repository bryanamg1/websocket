import { existsSync, promises } from 'fs';

export class ProductManager {

    constructor(path) {
        this.path = path;
    }

    getProduct = async (limit = null) => {
        try {
            if (existsSync(this.path)) {
                const data = await promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                if (limit === null){
                    return products;
                }
                    const limitedProducts = products.slice(0, limit);
                    return limitedProducts;
                } else {
                return [];
            };
        } catch (error) {
            console.error('el codigo proporcionado ha generado un error en getProduct' + error);
        }};

    getProductById = async (id)=>{
        try{
        const data = await promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        const productById = products.find(product=>product.id === id);
        if (!productById){
            console.error('not found');
            return;
        }
        return productById;
    }catch(error){
        console.error('el codigo proporcionado ha generado un error en getProductById' + error)
    }};


    addProduct =  async (tittle, price, stock) =>{
        try{
            if(!tittle ||!price || !stock){
                console.error('requiere llenar todos los campos')
                return;}
            const products = await this.getProduct()
            const product = {
                tittle,
                price,
                stock
            };
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1
            };
            products.push(product);
            await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }
        catch(error){
        console.error('el codigo proporcionado ha generado un error' + error)
        }};

    deleteProduct = async (id)=>{
        try {
            const products = await this.getProduct()
            const productIndex = products.findIndex((p) => p.id === id);
            if (productIndex === -1) {
                return;}
        products.splice(productIndex, 1);
        console.log('eliminando producto')
        await promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error('el codigo proporcionado ha generado un error' + error)
        }};
};