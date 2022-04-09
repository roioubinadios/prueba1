
const csv = require('csvtojson');

//Transforma el csv a formato json y devuelve una promesa que manejamos en app.js
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

//exportamos la constante para utilizarla en app.js
module.exports = {
    getJson
}