import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-items';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {



  private CARPETA_IMAGENES = 'img';

  constructor(private angularFirestore: AngularFirestore) { }


  cargarImagenesFirebase(archivos: FileItem[]) {
    // console.log(archivos);

    const storageRef = firebase.storage().ref();

    for (const item of archivos) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error('Error al subir: ', error)
        },
        async () => {
          // console.log("Imagen cargada correctamente");
          item.url = await uploadTask.snapshot.ref.getDownloadURL();
          item.estaSubiendo = false;
          // console.log('url error ' + uploadTask.snapshot.downloadURL);
          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          });
        });
    }
  }

  private guardarImagen(imagen: { nombre: string, url: string }): void {

    this.angularFirestore.collection(`${this.CARPETA_IMAGENES}`).add(imagen);

  }




//   private CARPETA_IMAGENES = 'img';
//  // este sera el objeto que tendra la referencia e imagen como tal 

//   // importamos el servicio
//   constructor(private db: AngularFirestore) { 

//   }


  // metodo que recibe un arreglo de imagenes

  // cargarImagenesFirebase(imagenes: FileItem[]) {
  //   // console.log(imagenes);
  //   const storageRef = firebase.storage().ref();
  //   for (const item of imagenes){
  //     item.estaSubiendo = true; // el archivo se está subiendo
  //     if (item.progreso >= 100) { //Satate el codigo que voy hacer despues 
  //       continue;
  //     }
  //     // almaceno url completo de firebase
  //     const uploadTask: firebase.storage.UploadTask =
  //       storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
  //         .put(item.archivo);


  //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //       (snapshot: firebase.storage.UploadTaskSnapshot) =>
  //         item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
  //       (error) => console.error('Error al subir', error),
  //       () => {

  //         console.log('Imagen cargada correctamente');
  //         item.url = uploadTask.snapshot.downloadURL;
  //         item.estaSubiendo = false;
  //         this.guardarImagen({
  //           nombre: item.nombreArchivo,
  //           url: item.url
  //         });
  //       });

  //   }
  // }

  // metodo para guardar imagen , almacenando la referencia de la misma

  // private guardarImagen( imagen:{ nombre: string, url: string} ){

  //   this.db.collection(`/${this.CARPETA_IMAGENES}`)// referencia
  //          .add( imagen); // Guardamos  

  // }
}
