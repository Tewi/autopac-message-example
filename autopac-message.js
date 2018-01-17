// default transferencia value
const DEFAULT_TRANSFERENCIA = {
    origen: {},
    monto: 666,
    destinatario: {
        nombre: "fintual",
        rut: "666-k",
        mail: "fitnual666@fintual.com",
        numeroCuenta: "666",
        banco: "banco de chile",
        tipoCuenta: "corriente"
    },
    programacion: {
        fechaInicio: "2016-06-06",
        fechaTermino: "2019-09-09",
        frecuencia: "mensual"
    }
};

//origin values
const origin = {
    name: "autopac-message-example"
}

// object that contains the data of the tranferencia 
var transferenciaOptions = new TransferenciaOptions(DEFAULT_TRANSFERENCIA);

// sends message with to the document, which the content script is listening with the same idMessage
function messageExtension(idMessage, data){
    var event = new MessageEvent(idMessage, {
        data : data
      });
    document.dispatchEvent(event);
}

// sends transferencia data to the extension
function sendTransferenciaToContentScript() {
    messageExtension("transferenciaFromPageScript", {
        from: origin.name,
        transferencia: transferenciaOptions.toObject()
    });
}

// request transferencia from the extension's storage
function getTransferenciaFromContentScript() {
    messageExtension("transferenciaFromContentScript", {
        from: origin.name
    });
}


function printTransferencia() {
    console.log(transferenciaOptions.toObject())
}

// add logic to the option page buttons
document.getElementById('sendTransferenciaBtn').addEventListener('click', sendTransferenciaToContentScript);
document.getElementById('getTransferenciaBtn').addEventListener('click', getTransferenciaFromContentScript);
document.getElementById('printTransferenciaBtn').addEventListener('click', printTransferencia);

//Event Listeners
// listens for the message that contains the transferencia data
window.addEventListener("message", function(event) {
    // only listen to autopac messages with data
    let data = event.data;
    if (data.from && data.from != "autopac" && !data.message) 
        return;
    switch (data.message) {
        case "transferenciaFromContentScript":
            if (!data.transferencia) return;
            console.log("transferenciaFromContentScript", data);
            // assign the global variable transferencia
            transferenciaOptions = new TransferenciaOptions(data.transferencia);
            break;
    }
});

