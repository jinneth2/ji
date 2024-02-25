
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Kevin',
        descripcion:"descripcion prod",
        precio: 1,
        imagen: "./img/Amigurumi_de_pinterest-removebg-preview.png"
    },
    {
        id: 2,
        nombre: 'vaca',
        descripcion:"descripcion prod",
        precio: 1.2,
        imagen:"img/Bolsa_de_Fresas_Vaca_Amigurumi_Patron_Gratis_PDF-removebg-preview.png",
    },
    {
        id: 3,
        nombre: 'scream',
        descripcion:"descripcion prod",
        precio: 2.1,
        imagen: "img/Crafting_Therapy__Dive_into_Exciting_Crocheting_Projects_Today-removebg-preview.png",
    },
    {
        id: 4,
        nombre: 'kevin kaarl',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "img/descarga-removebg-preview.png",
    },
    {
        id: 5,
        nombre: 'hongos',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "img/image-removebg-preview (8).png",
    },
    {
        id: 6,
        nombre: 'capibara',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "./img/capi.png",
    },
    {
        id: 7,
        nombre: 'ranita',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "img/verde.png",
    },
    {
        id: 8,
        nombre: 'coraje',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "img/CORAJE.png",
    },
    {
        id: 9,
        nombre: 'gary',
        descripcion:"descripcion prod",
        precio: 0.6,
        imagen: "./img/GRA.png",
    },
 
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        const miNododescripcion = document.createElement('h5');
        miNododescripcion.classList.add('card-descripcion');
        miNododescripcion.textContent = info.descripcion;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
     
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
    
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
     
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNododescripcion);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
  
    renderizarCarrito();

}

function renderizarCarrito() {
 
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
    
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
           
            return itemBaseDatos.id === parseInt(item);
        });
       
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
 
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
  
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
      
        return total + miItem[0].precio;
    }, 0).toFixed(3);
}


function vaciarCarrito() {
  
    carrito = [];

    renderizarCarrito();
}


DOMbotonVaciar.addEventListener('click', vaciarCarrito);


renderizarProductos();
renderizarCarrito();


