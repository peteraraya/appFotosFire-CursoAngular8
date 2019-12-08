import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})

export class CargaComponent implements OnInit {

  // Bandera para identificar cuando este sobre el elemento
  estaSobreElemento = false;
  // Tendre un arreglo de imagenes que queremos subir 
  archivos: FileItem[] = [];

  // Inyectamos en el servicio
  constructor(
      // tslint:disable-next-line: variable-name
      public _cargaImagenes: CargaImagenesService
  ) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }
  // Limpia tabla
  limpiarArchivos(){
    this.archivos = [];
  }

  // pruebaSobreElemento(event){
  //   console.log(event)
  // }

}
