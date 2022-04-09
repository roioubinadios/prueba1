//rutas de los archivos csv
const csvTiendas = './Carga_tiendas.csv';
const csvExtensiones = './Carga_extensiones.csv';
const fs = require('fs');

//importamos la función de flecha getJson creada en otro archivo y que devuelve una promesa
const { getJson } = require('./utiles/csvtojson');

function procesarDatos() {
    let statusHTTP = ''
    fs.appendFile('log.txt', `\nNueva ejecución\n`, (err) => {return;})
    getJson(csvTiendas)
        //manejamos la promesa para que los datos lleguen antes de utilizarlos
        .then(tiendas => {
            //obtenemos un array de tiendas e iteramos
            tiendas.forEach(tienda => {
                //llamamos API para introducir los datos de cada tienda
                //nos devuelve el id de la tienda insertada
                let id = tienda.ID_TIENDA;
                //comprobarmos que el id que nos devuelve no es nulo, lo cual significaría que algo fue mal con la inserción
                if (id) {
                    statusHTTP = '201 - Created'
                    console.log(`Insertada tienda con id: ${id}, nombre: ${tienda.NOMBRE_TIENDA}, departamentos: ${tienda.DEPARTAMENTOS}. Respuesta HTTP: ${statusHTTP}`);
                    //creamos el archivo de log y añadimos datos
                    fs.appendFile('log.txt', `Insertada tienda con id: ${id}, status: ${statusHTTP}, Fecha: ${imprimirFecha()}\n`, (err) => {return;})
                    getJson(csvExtensiones)
                        .then(extensiones => {
                            //obtenemos un array de extensiones e iteramos
                            extensiones.forEach(extension => {
                                if (extension.ID_TIENDA === id) {
                                    //llamamos API para introducir extension de la tienda
                                    statusHTTP = '201 - Created'
                                    console.log(`Insertada extensión de la tienda: ${id}, sección: ${extension.SECCION}, planta: ${extension.PLANTA}, descripcion: ${extension.DESCRIPCION}. Respuesta HTTP: ${statusHTTP}`);
                                    //añadimos datos al log
                                    fs.appendFile('log.txt', `Insertada extensión de la tienda: ${id}, status: ${statusHTTP}, Fecha: ${imprimirFecha()}\n`, (err) => {return;})
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    statusHTTP = '409 - Conflict'
                    console.log('La tienda no puedo ser insertada. Status 409 - Conflicto');
                    //devolvemos un 409 y guardamos en el log
                    fs.appendFile('log.txt', `No se pudo insertar la tienda (ID duplicado o sin especificar), status: ${statusHTTP}, Fecha: ${imprimirFecha()}\n`, (err) => {return;})
                }
            });
        })
        .catch(err => {
            console.log(err)
        });
}

//Función que devuelve la fecha actual formateada (dd/mm/yyyy, hh:mm:ss)
const imprimirFecha = () =>{
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleString();
    return fechaFormateada;
}

procesarDatos();

/*
DUDAS
Se puede modificar el body de un post desde Nodejs o solo recibirlo y tratar los datos que vienen en la request?
Primero saca los datos de las tiendas y despues los de las extensiones. Por que?
*/ 
