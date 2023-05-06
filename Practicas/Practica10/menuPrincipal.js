var menu = document.getElementById("menu");
fetch("./Practicas/Practica10/datos_mp.json")
.then (function(resp){
    return resp.json();
})
.then(function(datos){
    generarMenu(datos,menu);
    
});

function generarMenu(datos,menu){
    let json = datos;
    const lista = document.createElement('ul');
    lista.setAttribute("class","menu");
    menu.appendChild(lista);
  
    for (let i = 0; i < json.length; i++) {
        if(datos[i].padre == null){
            const registro = document.createElement('li');
            const enlace = document.createElement('a');
            enlace.setAttribute('href', datos[i].link);
            enlace.textContent = datos[i].nombre;
            registro.appendChild(enlace);
            lista.appendChild(registro);
        }
    }
}