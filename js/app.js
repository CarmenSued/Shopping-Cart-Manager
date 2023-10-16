//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito =[]; // El carrito sera un array pimero vacio que iremos llenando si se selecciona un curso

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        //reiniciar arreglo
        articulosCarrito =[]; //Reseatemos el arreglo
        limpiarHMTL(); //Eliminammos todo el HTML
        
    })

};

//Funciones
//agrega el curso al carrito
function agregarCurso(e){
    e.preventDefault(); // esto evitara que cuando presiones en el carrito para agregar, salte hacia arriba
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerCursoDatos(cursoSeleccionado);
};
//Funcion elimina un curso del carrito
function eliminaCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articluosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //Iterar sobre el carrito y mostrar su HTML
        carritoHTML();
    }
};

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerCursoDatos(curso){
    console.log(curso);

    //Crear un Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos =articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregamos el curso al carrito
        //dentro del Array tendremos una copia del carrito [...articulosCarrito] para que haga referencia de como esta
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);

    carritoHTML();
};

//Muestra el Carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML 
    limpiarHMTL();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) =>{
        const {imagen, titulo, precio, cantidad, id} = curso; //destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width ="100">
        </td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
         </td>   
        `;
        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
};

//Elimina los cursos del tbody
function limpiarHMTL(){
    //Forma Lenta:
    //contenedorCarrito.innerHTML = '';

    //Forma recomendada de limpiar un HTML
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}