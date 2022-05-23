import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  
  public folder: string;
  categorias: any = [];
  contactos: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public database: DatabaseService,
    ) {
      //crear base de datos, tablas y listar
      this.database.crearBaseDatos().then( () => {
        this.listarCategorias();
        this. listarContactos();
      });
     }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
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


}
