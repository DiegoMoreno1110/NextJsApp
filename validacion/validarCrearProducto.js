export default function validarCrearProducto(valores) {

    let errores = {};

    // Validar el nombre del ususario
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }
    
    if(!valores.empresa){
        errores.empresa = "El nombre de empresa es obligatorio";
    }
    
    if(!valores.url){
        errores.url = "El url del producto es obligatorio";
    }else if(!/^(ftp|http|https):\/\/[^"]+$/.test(valores.url)){
        errores.url = "El url  no válida";
    }
    
    if(!valores.descripcion){
        errores.descripcion = "La descripcion es obligatoria";
    }

    return errores;

}