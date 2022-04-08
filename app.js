//json con los datos de los csv
const {tiendas, extensiones} = require('./utiles/csvtojson');

tiendas.forEach(tienda => {
    //llamamos API para introducir datos de la tienda
    //devuelve el id
    let id = tienda.ID_TIENDA;
    console.log(`Insertada tienda con id: ${id}`);
    extensiones.forEach(extension =>{
        if(extension.ID_TIENDA === id){
            //llamamos API para introducir extension de la tienda
            console.log(`Insertada extensión a la tienda con id: ${id}, Datos: `);
        }
    })
});