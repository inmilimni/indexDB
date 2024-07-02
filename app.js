let db;

document.addEventListener('DOMContentLoaded',()=> {
    //llamar a una funcion para crear la bd
    crmDB();

    setTimeout(()=>{
        crearCliente();
    },5000)
});
function crmDB(){
    //crear bd con indexDB
    let crmDB = window.indexedDB.open("crmDB", 1);

    //si hay un error
    crmDB.onerror = function(){
        console.log("hubo un error");
    }

    //no hay error
    crmDB.onsuccess = function(){
        console.log("Base de datos frue creada");
        db = crmDB.result;
    }

    //configurar la base de datos onpugradeneeded solo se va a ejecutar una vez
    crmDB.onupgradeneeded = function(e){
        console.log("prueba");
        const db = e.target.result
        const objectStore = db.createObjectStore("crmDB", {
            KeyPath:"crmDB",
            autoIncrement: true
        })
    
        //definir las columnas
        objectStore.createIndex('nombre','nombre',{unique:false});
        objectStore.createIndex('email','email',{unique:true});
        objectStore.createIndex('telefono','telefono',{unique:false});
    }

}
function crearCliente(){
    let transaction = db.transaction(['crmDB'], 'readwrite');
    transaction.oncomplete = function(){
        console.log('La transaccion ha sido completada');
    }
    transaction.onerror = function(){
        console.log('ha ocurrido un error');
    }

    //crear un objeto
    const objectStore = transaction.objectStore('crmDB');
    const nuevoCliente = {
        nombre: 'Eli',
        telefono: 123456,
        email: 'xjdjsjze@correo.com'
    }
    let peticion = objectStore.add(nuevoCliente);
    console.log(peticion);
}