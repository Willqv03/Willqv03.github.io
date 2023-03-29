var menu = document.getElementById("menu");
fetch("./datosMenu.json")
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
            let prueba = 0;
            let ul = document.createElement('ul');
            for (let pos = 0; pos < json.length; pos++) {
                if (datos[i].id == json[pos].padre) { 
                    prueba++;
                    if(prueba == 1){
                        registro.appendChild(ul); 
                        ul.appendChild(generarSubmenu(json[pos],ul, json,"submenu"));   
                    }else{
                        ul.appendChild(generarSubmenu(json[pos],ul, json,"submenu")); 
                    }
                }
            }
            lista.appendChild(registro);
        }
    }
}

function generarSubmenu(submenu,menu,json,clase){
    menu.setAttribute("class",clase)
    const registro = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.setAttribute('href', submenu.link);
    enlace.textContent = submenu.nombre;
    registro.appendChild(enlace);
    let prueba = 0;
    let ul = document.createElement('ul');;
    for (let pos = 0; pos < json.length; pos++) {
        if (submenu.id == json[pos].padre) { 
            prueba++;
            if(prueba == 1){
                registro.appendChild(ul); 
                ul.appendChild(generarSubmenu(json[pos],ul, json,"submenu2"));   
            }else{
                ul.appendChild(generarSubmenu(json[pos],ul, json,"submenu2")); 
            }
        }
    } 
    return registro;
}