//con este socket vamos a establecer la comunicacion con el servidor 
const socket = io();

const agregarForm = document.getElementById('agregarForm');
const tittleImput = document.getElementById('tittle');
const priceImput = document.getElementById('price');
const stockImput = document.getElementById('stock');

agregarForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const tittle = tittleImput.value;
    const price = priceImput.value;
    const stock = stockImput.value


socket.emit('agregarProducto', tittle, price, stock);

tittleImput.value = '';
priceImput.value = '';
stockImput.value = '';
});

//----------------------------------------------------------

const eliminarForm = document.getElementById('eliminarForm');
const productIdInput = document.getElementById('productId');

eliminarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = productIdInput.value;

    socket.emit('eliminarProducto', productId, console.log('evento emitido'));

    productIdInput.value = '';
});

//------------------------------------------------------

const contenedor = document.getElementById('contenedorDeProductos');

socket.on('mostrartodo', data => {
    contenedor.innerHTML = '';

    data.forEach(products => {
        contenedor.innerHTML += `
            <ul>
                <li>${products.tittle}</li>
                <li>${products.price}</li>
                <li>${products.stock}</li>
                <li>${products.id}</li>
            </ul>
        `;
    });
});

