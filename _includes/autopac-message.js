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

// object that contains the data of the tranferencia 
var transferenciaOptions = new TransferenciaOptions(DEFAULT_TRANSFERENCIA);

function messageAutoPac() {
    messageExtension("transferenciaFromPageScript", {
        from: "messageTest",
        transferencia: transferenciaOptions.toObject()
    });
}

// sends message with to the document, which the content script is listening with the same idMessage
function messageExtension(idMessage, data){
    var event = new MessageEvent(idMessage, {
        data : data
      });
    document.dispatchEvent(event);
}

function printTransferencia() {
    console.log(transferenciaOptions.toObject())
}

// add logic to the option page buttons
document.getElementById('messageBtn').addEventListener('click', messageAutoPac);
// document.getElementById('get').addEventListener('click', loadTransferenciaFromLocalStorage);
document.getElementById('printTransferenciaBtn').addEventListener('click', printTransferencia);

