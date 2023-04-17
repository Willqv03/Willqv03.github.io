function generarqr(){
    const nombre = "FN%3A"+ document.querySelector("#nombre").value + "%0A";
    const telefono = "TEL%3BCELL%3A"+ document.querySelector("#telefono").value + "%0A";
    const correo = "EMAIL%3BHOME%3BINTERNET%3A"+ document.querySelector("#correo").value+ "%0A";
    const imagen = document.querySelector(".qr-img");
    var inicioURL = "https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0A";
    var finalURL = "END%3AVCARD%0A";
    qrURL = inicioURL + nombre + telefono + correo + finalURL;
    imagen.setAttribute("src",qrURL);
    imagen.setAttribute("width","200px");
    imagen.setAttribute("height","200px");
}