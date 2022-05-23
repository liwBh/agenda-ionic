import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  
  categorias: any = [];
  contactos: any = [];
  select_categoria: number = 0;
  categoria_id: number = 0;
  contacto_id: number = 0;
  contacto_nombre: string = "";
  contacto_telefono: number = 0;
  editar: boolean = false;

  constructor(
    public database: DatabaseService,
    public toastController: ToastController
  ) { 
    this.listarCategorias();
    this.listarContactos();
  }

  ngOnInit() {
  }

  listarCategorias(){
    this.database.listarCategorias().then( (data) => {
      this.categorias = [];

      if( data.rows.length > 0){

        for(let i = 0; i < data.rows.length; i++){
          this.categorias.push( data.rows.item(i) );
        }
      }
    }); 
  }

  insertarContacto(){
    //validar entrada

    if( this.categoria_id === 0 ){
      this.mostrarMensaje("Debe elegir una categoria!", 'close-circle', "danger");
      return;
    } 
    else if( !this.contacto_nombre.length ){
      this.mostrarMensaje("Debe ingresar un nombre de contacto!", 'close-circle', "danger");
      return;
    }
   else if( (""+ this.contacto_telefono).length < 8 || (""+ this.contacto_telefono).length > 11){
      this.mostrarMensaje("Debe ingresar un numero minimo de 8 y maximo de 11 digitos", 'close-circle', "danger");
      return;
    }

    if( this.editar ){
      //editar
      this.database.editarContacto( this.contacto_id, this.categoria_id, this.contacto_nombre, this.contacto_telefono)
      .then( (data) => {
        this.mostrarMensaje(data,'checkmark-circle', "");
      });
      this.listarContactos();

    }else{
      //insertar
      this.database.insertarContacto( this.categoria_id, this.contacto_nombre, this.contacto_telefono )
      .then( (data) => {
        this.mostrarMensaje(data,'checkmark-circle', "");
        this.listarContactos();
      })

    }

    this.resetearValores();
  }

  listarContactos(){
    this.database.listarContactos().then( (data) => {
      this.contactos = [];

      if( data.rows.length > 0){

        for(let i = 0; i < data.rows.length; i++){
          this.contactos.push( data.rows.item(i) );
        }
      }
    }); 
  }

  eliminarContacto(id:number){
    this.database.eliminarContacto(id)
    .then( (data) => {
     this.mostrarMensaje(data,'checkmark-circle', "");
      this.listarContactos();
    });

    this.resetearValores();
  }

  editarContacto(contacto: any){
    this.editar = true;
    this.contacto_id = contacto.id;
    this.categoria_id = contacto.categoria_id;
    this.contacto_nombre = contacto.nombre;
    this.contacto_telefono = contacto.tb_conctacto;
    this.select_categoria = contacto.categoria_id;
  }

  resetearValores(){
    this.editar = false;
    this.contacto_id = 0;
    this.categoria_id = 0;
    this.contacto_nombre = "";
    this.contacto_telefono = 0;
    this.select_categoria = 0;
  }

  async mostrarMensaje( mensaje: string, icono: string, color: string) {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      icon: icono,
      position: 'top',
      animated: true,
      color: !color? "primary" : "danger"
    });

    toast.present();
  }

}
