
const entrada = document.querySelector("#ced");
let result = document.getElementById("salidaResultado");
entrada.addEventListener("keyup",borrar);

function borrar(){
  result.innerText = " ";
}
function comprobar(cedula){
  console.log(cedula.length);
  let valores = cedula.slice(0,3);
  if(valores === "000"){
    return false;
  }
  if(cedula.length < 11){
    return false;
  }
  return true;
}

function validar() {
  let cedula = entrada.value;
  let cedArray = cedula.split("");
  let condicion = comprobar(cedula);
  let digitoVerificador = parseInt(cedArray[cedArray.length - 1]);
  let sumaIndiceImpar = 0;
  let grupoNumerosIndicePar = "";
  let sumaIndicePar = 0;
  let resultado = 0;

  for (let i = 0; i < 5; i++) {
    let indiceImpar = 2 * i;
    let indicePar = 2 * i + 1;
    sumaIndiceImpar += parseInt(cedArray[indiceImpar]);
    digitoIndicePar = parseInt(cedArray[indicePar]) * 2;
    grupoNumerosIndicePar += digitoIndicePar;
  }

  grupoNumerosIndicePar = grupoNumerosIndicePar.split("");

  for (let i = 0; i < grupoNumerosIndicePar.length; i++) {
    sumaIndicePar += parseInt(grupoNumerosIndicePar[i]);
  }

  resultado = ((sumaIndiceImpar + sumaIndicePar) * 9) % 10;

  if (resultado == digitoVerificador && condicion) {
    result.innerText = "La cédula ingresada es válida :)";
  } else {
    result.innerText = "La cédula ingresada es inválida :(";
  }
}

