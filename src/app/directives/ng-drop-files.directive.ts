import {
  Directive, EventEmitter, ElementRef,
  HostListener, Input, Output} from '@angular/core';
import { FileItem } from '../models/file-items';



@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];  // tenemos que tener una relación son los archivos que tengo que controlar

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

// Espesificar cuando el mouse esta sobre
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event); // hay que prevenir
  }
  // Cuando el mouse se va
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }
// Cuando se suelta el mouse
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    // Tengo la info de los archivos
    const transferencia = this._getTransferencia(event);
    // si no hay nada que transferir
    if (!transferencia) {
      return;
    }

    // Los archivos se encuentran en transferencias.files
    this._extraerArchivos(transferencia.files);

    // Prevenimos para que no lo abra todo
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);

  }
  // compatibilidad de drag and drop
  private _getTransferencia(event: any) {
    // usa el por defecto o usa el origin que usan otros navegadores
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }


  private _extraerArchivos(archivosLista: FileList) {

    console.log( archivosLista );

    // tslint:disable-next-line:forin Se hace un ciclo for para barrer con todas las propiedades de ese objeto
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemporal)) {

        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);

      }
    }
    console.log(this.archivos);
  }
  // Validaciones de la directiva que seran privadas porque no saldran de esta directiva
  private _archivoPuedeSerCargado(archivo: File): boolean {
// si el archivo ya fue dropeado y si es imagen 
    if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
      return true; // retorna si se cumple la condición
    } else {
      return false;
    }

  }

  // Evitar que el navegador no abra la imagen
  private _prevenirDetener(event) {
    event.preventDefault(); //
    event.stopPropagation();
  }

  // Validamos que el archivo no ecista en mi arreglo de archivos
  
  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {

    for (const archivo of this.archivos) {

      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }

    }
    // No lo encuentra
    return false;
  }

  // Validar que el arhivo sea imagen, no aceptará nada que no lo sea
  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }



}


// EventEmitter : Para Hablar con el padre
// ElementRef : no es necesario en este , sirve para tener una relacion directa con ese html que tiene esaa directiva
// HostListener : nos va servir para crear eventos o callback cuando algo suceda , escuchar cuando el mouse este encima , un track etc
// Input : para recibir info del padre
// output : que tambien esta relacionado con el event emitter de decirle que tambien tiene una respuesta aqui
          // y haz algo con eso