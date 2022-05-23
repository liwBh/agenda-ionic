import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  nombre_categoria: string = "";
  categorias: any = [];
  editar: boolean = false;
  id_categoria: number = 0;

  constructor(
    public database: DatabaseService,
    public toastController: ToastController
    ) { 

    //crear base de datos, tablas y listar
    this.database.crearBaseDatos().then( () => {
        this.listarCategorias();
    });

  }

  ngOnInit() {
  }

  insertarCategoria(){
    //validar entrada
    if( !this.nombre_categoria.length ){
      this.mostrarMensaje("Debe ingresar un nombre de categoria!", 'close-circle', "danger");
      return;
    }

    if( this.editar ){
      //editar
      this.database.editarCategoria(this.id_categoria, this.nombre_categoria)
      .then( (data) => {
        this.mostrarMensaje(data,'checkmark-circle', "");
      });
      this.listarCategorias();

    }else{
      //insertar
      this.database.insertarCategoria( this.nombre_categoria )
      .then( (data) => {
        this.mostrarMensaje(data,'checkmark-circle', "");
        this.listarCategorias();
      })

    }

    this.resetearValores();
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

  eliminarCategoria(id:number){
    this.database.eliminarCategoria(id)
    .then( (data) => {
     this.mostrarMensaje(data,'checkmark-circle', "");
      this.listarCategorias();
    });

    this.resetearValores();
  }

  editarCategoria(id:number, nombre_categoria:string){
    this.editar = true;
    this.id_categoria = id;
    this.nombre_categoria = nombre_categoria;
  }

  resetearValores(){
    this.editar = false;
    this.nombre_categoria = "";
    this.id_categoria = 0;
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
