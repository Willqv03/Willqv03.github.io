let pacientes = [];
var form_step = document.querySelectorAll(".form_step");

var done_btn = document.querySelector(".done_btn");
var next_btn = document.querySelector(".btn_next");
var back_btn = document.querySelector(".btn_back");
var form_progressbar = document.querySelectorAll(".form_progressbar");

var btn_done = document.querySelector(".btn_done");
var btn_update = document.querySelector(".btn_update");
var modal_wrapper = document.querySelector(".modal_wrapper");
var modal_wrapper2 = document.querySelector(".modal_wrapper2");
var modal_wrapper3 = document.querySelector(".modal_wrapper3");
var shadow = document.querySelector(".shadow");
var edit_title = document.querySelector(".edit_title");
var shadow2 = document.querySelector(".shadow2");
var shadow3 = document.querySelector(".shadow3");
var newbtn_done = document.querySelector(".btn_done");
let pasoActual = 0;

function updateProgressbar(n) {
  if(n < pasoActual){
    form_progressbar[pasoActual].classList.remove("active");
  }
  form_step[pasoActual].style.display = "none";
  
  pasoActual = n;

  form_step[pasoActual].style.display = "block";
  form_progressbar[pasoActual].classList.add("active");
  if (pasoActual === 0) {
      back_btn.style.display = "none";
    } else {
      back_btn.style.display = "flex";
    }
    if (pasoActual === form_step.length - 1) {
      next_btn.style.display = "none";
      btn_done.style.display = "flex";
    } else {
      next_btn.style.display = "flex";
      btn_done.style.display = "none";
    }
}

function guardarDatos(num){
  const nombre = document.querySelector("#nombre").value;
  const cedula = document.querySelector("#cedula").value;
  const fechaNacimiento = document.querySelector("#fechaNacimiento").value;
  const sexo = document.querySelector("#sexo").value;
  const telefono = document.querySelector("#telefono").value;
  const sangre = document.querySelector("#sangre").value;

  const parientes = Array.from(document.querySelectorAll('.pariente')).map((pariente) => {
    return {

      nombrePariente: pariente.querySelector("#nombrePariente").value,
      relacion: pariente.querySelector("#relacion").value,
      fechaPariente: pariente.querySelector("#fechaPariente").value,
      sexoPariente: pariente.querySelector("#sexoPariente").value,
      sangrePariente: pariente.querySelector("#sangrePariente").value,
      telPariente: pariente.querySelector("#telPariente").value
    }
  });

  const condicionesSalud = Array.from(document.querySelectorAll('.CondicionDeSalud')).map((condicion) => {
    return {

      enfermedad: condicion.querySelector("#enfermedad").value,
      tiempoEnfermedad: condicion.querySelector("#tiempoEnfermedad").value,
      detalles: condicion.querySelector("#detalles").value

    }
  });

  const internamientos = Array.from(document.querySelectorAll('.internamiento')).map((internamiento) => {
    return {

      fechaInternamiento: internamiento.querySelector("#fechaInternamiento").value,
      centroMedico: internamiento.querySelector("#centro").value,
      diagnostico: internamiento.querySelector("#diagnostico").value,
    }
  });

  const paciente = {
    nombre,cedula,fechaNacimiento,sexo,sangre,telefono,parientes,condicionesSalud,internamientos
  };
  switch (num){
    case 1:
      return paciente;
      break;
    case 2:
      pacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      cargarDatos();
      break;
  }

}

function actualizarDatos(index){
  pacientes[index].nombre = document.querySelector("#nombre").value;
  pacientes[index].cedula = document.querySelector("#cedula").value;
  pacientes[index].fechaNacimiento = document.querySelector("#fechaNacimiento").value;
  pacientes[index].sexo = document.querySelector("#sexo").value;
  pacientes[index].telefono = document.querySelector("#telefono").value;
  pacientes[index].sangre = document.querySelector("#sangre").value;

  pacientes[index].parientes = Array.from(document.querySelectorAll('.pariente')).map((pariente) => {
    return {

      nombrePariente: pariente.querySelector("#nombrePariente").value,
      relacion: pariente.querySelector("#relacion").value,
      fechaPariente: pariente.querySelector("#fechaPariente").value,
      sexoPariente: pariente.querySelector("#sexoPariente").value,
      sangrePariente: pariente.querySelector("#sangrePariente").value,
      telPariente: pariente.querySelector("#telPariente").value
    }
  });

  pacientes[index].condicionesSalud = Array.from(document.querySelectorAll('.CondicionDeSalud')).map((condicion) => {
    return {

      enfermedad: condicion.querySelector("#enfermedad").value,
      tiempoEnfermedad: condicion.querySelector("#tiempoEnfermedad").value,
      detalles: condicion.querySelector("#detalles").value

    }
  });

  pacientes[index].internamientos = Array.from(document.querySelectorAll('.internamiento')).map((internamiento) => {
    return {

      fechaInternamiento: internamiento.querySelector("#fechaInternamiento").value,
      centroMedico: internamiento.querySelector("#centro").value,
      diagnostico: internamiento.querySelector("#diagnostico").value,
    }
  });

    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    cargarDatos();
}


next_btn.addEventListener("click",function(){
  let valid = validateForm(pasoActual);
  if(valid){
    let n = pasoActual;
    n++;
    updateProgressbar(n);
  }else{
      alert("Complete todos los campos");
  }

  if(pasoActual === form_step.length-1){
    var paciente = guardarDatos(1);
    mostrarDatos(paciente,1);
  }
});

back_btn.addEventListener("click",function(){
    let n = pasoActual;
    n--;
    updateProgressbar(n);
});

btn_done.addEventListener("click", function(){
    modal_wrapper.classList.add("active");
    guardarDatos(2);
    reiniciarFormulario();
});

shadow.addEventListener("click", function(){
    modal_wrapper.classList.remove("active");
});

shadow2.addEventListener("click", function(){
  modal_wrapper2.classList.remove("active");
});

shadow3.addEventListener("click", function(){
  modal_wrapper3.classList.remove("active");
});

function validateForm(currentTab) {
    let inputs = form_step[currentTab].querySelectorAll("input, select, textarea");
    let valid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        valid = false;
      }
    }
    return valid;
}

function reiniciarFormulario() {
  for(let j = 0; j < 5; j++){
    let inputs = form_step[j].querySelectorAll("input, select, textarea");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
  contador = pasoActual;
  while(contador != 0){
    contador--;
    updateProgressbar(contador);
  }

  const parientelist = document.querySelectorAll(".pariente");
  const condicionlist = document.querySelectorAll(".CondicionDeSalud");
  const internamientolist = document.querySelectorAll(".internamiento");
  limpiarObjetos(parientelist,1);
  limpiarObjetos(condicionlist,2);
  limpiarObjetos(internamientolist,3);
}

function limpiarObjetos(objetoList,num){
  objetoList.forEach((objeto,index) => {
    if(index > 0){
      removeItem(objeto,num);
    }
  });
}

function addPariente() {
  const item = document.createElement('div');
  item.classList.add('pariente');
  item.innerHTML = `
    <hr><br>
    <button type="button" class="eliminar_btn" onclick="removeItem(this,1)">Eliminar</button>
    <div class="input_wrap">
      <label for="nombrePariente">Nombre Completo</label>
      <input required type="text" id="nombrePariente" name="nombrePariente">
    </div>
    <div class="input_wrap">
      <label for="relacion">Relacion</label>
      <input required type="text" id="relacion">
    </div>
    <div class="input_wrap">
      <label for="fechaPariente">Fecha de Nacimiento</label>
      <input required type="date" name="fechaPariente" id="fechaPariente">
    </div>
    <div class="input_wrap">
      <label for="sexo">Sexo</label>
      <select name = 'sexoPariente' id = 'sexoPariente'>
        <option></option>
          <option value = 'Masculino'>Masculino</option>
          <option value = 'Femenino'>Femenino</option>
      </select>
    </div>
    <div class="input_wrap">
      <label for="sangrePariente">Tipo de Sangre</label>
      <select name = 'sangrePariente' id ='sangrePariente'>
        <option></option>
        <option value = 'O-'>O-</option>
        <option value = 'O+'>O+</option>
        <option value = 'A-'>A-</option>
        <option value = 'A+'>A+</option>
        <option value = 'B-'>B-</option>
        <option value = 'B+'>B+</option>
        <option value = 'AB-'>AB-</option>
        <option value = 'AB+'>AB+</option>
      </select>
    </div>
    <div class="input_wrap">
      <label for="telPariente">Telefono</label>
      <input required type="text" id="telPariente" name="telPariente">  
    </div>`

  document.getElementById('parientes-container').appendChild(item);
}

function addCondicion() {
  const item = document.createElement('div');
  item.classList.add('CondicionDeSalud');
  item.innerHTML = `
    <hr><br>
    <button type="button" class="eliminar_btn" onclick="removeItem(this,2)">Eliminar</button>
    <div class="input_wrap">
      <label for="enfermedad">Enfermedad</label>
      <input required type="text" id="enfermedad" name="enfermedad">
    </div>

    <div class="input_wrap">
      <label for="tiempoEnfermedad">Tiempo con la Enfermedad</label>
      <input required type="text" id="tiempoEnfermedad" name="tiempoEnfermedad">
    </div>

    <div class="input_wrap">
      <label for="detalles">Detalle</label>
      <input required type="text" name="detalles" id="detalles">
    </div>`
  document.getElementById('condiciones-container').appendChild(item);
}


function addInternamiento() {
  const item = document.createElement('div');
  item.classList.add('internamiento');
  item.innerHTML = `
  <hr><br>
  <button type="button" class="eliminar_btn" onclick="removeItem(this,3)">Eliminar</button>
  <div class="input_wrap">
    <label for="fechaInternamiento">Fecha</label>
    <input required type="date" id="fechaInternamiento" name="fechaInternamiento" >
  </div>

  <div class="input_wrap">
    <label for="centro">Centro Medico</label>
    <input required type="text" id="centro" name="centro">
  </div>

  <div class="input_wrap">
    <label for="diagnostico">Diagnóstico</label>
    <input required type="text" id="diagnostico" name="diagnostico"> 
  </div>`
  document.getElementById('internamientos-container').appendChild(item);
}

function removeItem(button, num) {
  switch(num){
    case 1:
      button.closest('.pariente').remove();
      break;
    case 2:
      button.closest('.CondicionDeSalud').remove();
      break;
    case 3:
      button.closest('.internamiento').remove();
      break;
  }

}

function mostrarDatos(paciente,num){
  let contador = 0;
  let confirmDataHTML = `
  <h3>Informacion Personal:</h3>
  <ul>
    <li>Nombre: ${paciente.nombre}</li>
    <li>Cedula: ${paciente.cedula}</li>
    <li>Fecha de nacimiento: ${paciente.fechaNacimiento}</li>
    <li>Sexo: ${paciente.sexo}</li>
    <li>Tipo de Sangre: ${paciente.sangre}</li>
    <li>Telefono: ${paciente.telefono}</li>
  </ul>
  <h3>Parientes:</h3>
  <ul>
  `
  paciente.parientes.forEach((pariente) => {
      confirmDataHTML += `
      <li>Nombre: ${pariente.nombrePariente}</li> 
      <li>Relacion: ${pariente.relacion}</li>
      <li>Fecha de Nacimiento: ${pariente.fechaPariente}</li>
      <li>Sexo: ${pariente.sexoPariente}</li>
      <li>Tipo de Sangre: ${pariente.sangrePariente}</li>
      <li>Telefono: ${pariente.telPariente}</li>
      `;   
      if(contador < paciente.parientes.length-1){
        confirmDataHTML += `<hr>`
      }
      contador++;    
  });

  confirmDataHTML += `
  <h3>Condiciones Pre-Existentes de Salud:</h3>
  <ul>`

  contador = 0;
  paciente.condicionesSalud.forEach((condicion) => {
    confirmDataHTML += `
    <li>Enfermedad: ${condicion.enfermedad}</li> 
    <li>Tiempo con la Enfermedad: ${condicion.tiempoEnfermedad}</li>
    <li>Detalles: ${condicion.detalles}</li>
    `;   
    if(contador < paciente.condicionesSalud.length-1){
      confirmDataHTML += `<hr>`
    }
    contador++;
  });

  
  confirmDataHTML += `
  <h3>Internamientos Realizados:</h3>
  <ul>`
  contador = 0;
  paciente.internamientos.forEach((internamiento) => {
    confirmDataHTML += `
    <li>Fecha: ${internamiento.fechaInternamiento}</li> 
    <li>Centro Medico: ${internamiento.centroMedico}</li>
    <li>Diagnostico: ${internamiento.diagnostico}</li>
    `;   
    if(contador < paciente.internamientos.length-1){
      confirmDataHTML += `<hr>`
    }
    contador++;
  });

  confirmDataHTML += '</ul>';
  switch(num){
    case 1:
      document.getElementById('confirm-info').innerHTML = confirmDataHTML;
      break;
    case 2:
      document.querySelector(".modal_wrapper2 .contenido").innerHTML = confirmDataHTML;
      modal_wrapper2.classList.add("active");
  }
  

}

function cargarDatos(){
  
  if(localStorage.getItem("pacientes") == null){
    pacientes = [];
  }else{
    pacientes = JSON.parse(localStorage.getItem("pacientes"));
  }
  var html = "";

  pacientes.forEach((paciente, index) =>{
    html += `
      <tr>
        <td> ${paciente.cedula}</td>
        <td>${paciente.nombre}</td>
        <td>
          <button onclick="verData(${index})" class="ver_btn">Ver</button>
          <button onclick="deleteData(${index})" class="eliminar_btn">Eliminar</button>
          <button onclick="updateData(${index})" class="editar_btn">Editar</button>
        </td>
      </tr>
    `
  });
  document.querySelector("#tablaCRUD tbody").innerHTML = html;
}

document.onload = cargarDatos();

function deleteData(index){
  pacientes.splice(index, 1);
  localStorage.setItem("pacientes",JSON.stringify(pacientes));
  cargarDatos();
}

function updateData(index){
  btn_done = btn_update;
  edit_title.classList.add("active");

  document.getElementById("nombre").value = pacientes[index].nombre;
  document.getElementById("cedula").value = pacientes[index].cedula;
  document.getElementById("fechaNacimiento").value = pacientes[index].fechaNacimiento;
  document.getElementById("sexo").value = pacientes[index].sexo;
  document.getElementById("sangre").value = pacientes[index].sangre;
  document.getElementById("telefono").value = pacientes[index].telefono;
 
  pacientes[index].parientes.forEach((pariente, indice) => {
    if(indice > 0){
      addPariente();
    }
  });

  const nombreParientes = document.querySelectorAll("#nombrePariente");
  const relacionParientes = document.querySelectorAll("#relacion");
  const fechaParientes = document.querySelectorAll("#fechaPariente");
  const sexoParientes = document.querySelectorAll("#sexoPariente");
  const sangreParientes = document.querySelectorAll("#sangrePariente");
  const telParientes = document.querySelectorAll("#telPariente");
  
  pacientes[index].parientes.forEach((pariente, indice) => {
      nombreParientes[indice].value = pariente.nombrePariente;
      relacionParientes[indice].value = pariente.relacion;
      fechaParientes[indice].value = pariente.fechaPariente;
      sexoParientes[indice].value = pariente.sexoPariente;
      sangreParientes[indice].value = pariente.sangrePariente;
      telParientes[indice].value = pariente.telPariente;
  });

  pacientes[index].condicionesSalud.forEach((condicion, indice) => {
    if(indice > 0){
      addCondicion();
    }
  });

  const enfermedad = document.querySelectorAll("#enfermedad");
  const tiempoEnfermedad = document.querySelectorAll("#tiempoEnfermedad");
  const detalles = document.querySelectorAll("#detalles");

  pacientes[index].condicionesSalud.forEach((condicion, indice) => {
    enfermedad[indice].value = condicion.enfermedad;
    tiempoEnfermedad[indice].value = condicion.tiempoEnfermedad;
    detalles[indice].value = condicion.detalles;
  });



  pacientes[index].internamientos.forEach((internamiento, indice) => {
    if(indice > 0){
      addInternamiento();
    }
  });

  const fechaInternamiento = document.querySelectorAll("#fechaInternamiento");
  const centroMedico = document.querySelectorAll("#centro");
  const diagnostico = document.querySelectorAll("#diagnostico");

  pacientes[index].internamientos.forEach((internamiento, indice) => {
    fechaInternamiento[indice].value = internamiento.fechaInternamiento;
    centroMedico[indice].value = internamiento.centroMedico;
    diagnostico[indice].value = internamiento.diagnostico;
  });

  document.querySelector(".btn_update").onclick = function(){
    modal_wrapper3.classList.add("active");
    actualizarDatos(index);
    btn_done = newbtn_done;
    edit_title.classList.remove("active");
    btn_update.style.display = "none";
    reiniciarFormulario();   
  }

}


function verData(index){
  pacientes.forEach((paciente,indice) => {
    if(indice === index){
      mostrarDatos(paciente,2);
    }
  });
}