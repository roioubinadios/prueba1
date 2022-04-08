
const csv = require('csvtojson');

const getJson = (csvFilePath) => csv({delimiter:';'})
    .fromFile(csvFilePath)
    .subscribe((json)=>{
        return new Promise((resolve,reject)=>{
            if(json){
                resolve(json);
            } else {
                reject("Json no encontrado");
            }
            // long operation for each json e.g. transform / write into database.
        })
});

const csv1='./Carga_tiendas.csv';
const csv2='./Carga_extensiones.csv';

const tiendas = []

getJson(csv1)
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            const tienda = json[i];
            tiendas.push(tienda);
        }
    })
    .catch(err => console.log(err));

const extensiones = []

getJson(csv2)
    .then(json => {
        for (let i = 0; i < json.length; i++) {
            const extension = json[i];
            extensiones.push(extension);
        }
    })
    .catch(err => console.log(err));


//ID_TIENDA;NOMBRE_TIENDA;DEPARTAMENTOS

//ID_TIENDA;SECCION;PLANTA;ZONA;DESCRIPCION


module.exports = {
    tiendas,
    extensiones
}