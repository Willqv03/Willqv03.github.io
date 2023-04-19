const formulario = document.querySelector("#formulario");
function generarqr(){
    const valid = validateForm();
    if(valid){
    const nombre = "FN:"+ document.querySelector("#nombre").value + "%0A";
    const telefono = "TEL;CELL:"+ document.querySelector("#telefono").value + "%0A";
    const correo = "EMAIL;HOME;INTERNET:"+ document.querySelector("#correo").value+ "%0A";
    
    const imgqr = document.querySelector(".qr-img");
    var inicioURL = "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A";
    var finalURL = "END%3AVCARD%0A";
    qrURL = inicioURL + nombre + telefono + correo + finalURL;
    imgqr.setAttribute("src",qrURL);
    imgqr.setAttribute("width","200px");
    imgqr.setAttribute("height","200px");
    }else{
        alert("Complete todos los campos");
    }
}

function validateForm() {
    let inputs = formulario.querySelectorAll("input, select, textarea");
    let valid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        valid = false;
      }
    }
    return valid;
}