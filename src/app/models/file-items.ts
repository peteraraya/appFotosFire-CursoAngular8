// export class FileItem {

//     public archivo: File;
//     public nombreArchivo: string;
//     public url: string;
//     public estaSubiendo: boolean; // bandera que controlara cuando este ya sea subido o pendiente
//     public progreso: number; // porcentaje de progreso

//     // Inicialización de cada una de las propiedades
//     constructor(archivo: File) {

//         this.archivo = archivo;
//         this.nombreArchivo = archivo.name;

//         this.estaSubiendo = false;
//         this.progreso = 0;
//     }
// }



export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor(archivo: File) {

        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.estaSubiendo = false;
        this.progreso = 0;

    }

}
