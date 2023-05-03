let entrada = document.querySelectorAll("input");
let result = document.querySelectorAll("canvas");


function borrar(){
  result = null;
}

entrada.addEventListener("keyup",borrar());

function generarGrafica(){
    const content = document.querySelector(".content");
    content.classList.add("active");
    const nombres = document.getElementsByName("nombre");
    const calificaciones = document.getElementsByName("nota");
    const n = [];
    const c = [];
    for (let i = 0; i < nombres.length; i++) {
        n.push(nombres[i].value);
        c.push(calificaciones[i].value);
    }
    

    var config = {
        type: 'pie',
        data: {
            labels: n,
            datasets: [{
                label: 'calificaciones',
                data: c,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1.5
            }]
        }
    };

    const ctx = document.getElementById('grafica');
    var migrafica = new Chart(ctx, config);


}

function addEstudiante() {
    const item = document.createElement('div');
    item.classList.add('estudiante');
    item.innerHTML = `
    <hr><br>
    <button type="button" class="eliminar_btn" onclick="removeItem(this)">Eliminar</button>
    <div class="input">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre">
    </div>
    <div class="input">
        <label for="telefono">Calificacion</label>
        <input type="number" name="nota" id="nota"> 
    </div>`

    document.getElementById('formulario').appendChild(item);
}

function removeItem(button) {

    button.closest('.estudiante').remove();

}