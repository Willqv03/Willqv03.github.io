var menu = document.getElementById("nav");
fetch("./datosMenu.json")
.then (function(resp){
    return resp.json();
})
.then(function(datos){
    console.log(datos);

    generarMenu(datos,menu,"menu-horizontal");

});

function generarMenu(datos,menu,id){
    const lista = document.createElement('ul'); 
    lista.setAttribute("id",id);
    menu.appendChild(lista);
  
    for (let i = 0; i < datos.length; i++) {
        const registro = document.createElement('li');
        const enlace = document.createElement('a');
        enlace.setAttribute('href', datos[i].link);
        enlace.textContent = datos[i].nombre;
        registro.appendChild(enlace);
  
        if (datos[i].submenu != null) {
            generarMenu(datos[i].submenu,registro,null);
        }
        lista.appendChild(registro);
    }
}