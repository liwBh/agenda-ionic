import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseObj: SQLiteObject;
  tables = {
    tb_categoria: "tb_categoria",
    tb_contacto: "tb_conctacto"
  }

  constructor(private sqlite: SQLite) { }

  //crear base de datos
  async crearBaseDatos(){
      await this.sqlite.create({
      name: "db_agenda",
      location: "default"
    })
    .then( (db:SQLiteObject) => {
      this.databaseObj = db;
    })
    .catch( (e) => {
      alert("Error al crear base de datos: " + JSON.stringify(e));
    });

    await this.crearTablas();
  }

  //crear tablas
  async crearTablas(){
    let query1 = `CREATE TABLE IF NOT EXISTS ${this.tables.tb_categoria} (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20) NOT NULL UNIQUE)`;
    await this.databaseObj.executeSql(query1,[]);

    let query2 = `CREATE TABLE IF NOT EXISTS ${this.tables.tb_contacto} (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria_id INTEGER UNSIGNED NOT NULL, nombre VARCHAR(30) NOT NULL, telefono INTEGER NOT NULL)`;
    await this.databaseObj.executeSql(query2,[]);
  }

  //metodos de categoria
  async insertarCategoria( nombre: string ){
    let query = `INSERT INTO ${this.tables.tb_categoria} (nombre) VALUES ('${nombre}')`;

    return this.databaseObj.executeSql(query,[])
    .then( () => {
      return "categoria agregada con exito!";
    })
    .catch( (e) =>{
      if(e.code === 6){
        return "Error la categoria ya esta registrada!";
      }
      
      return "Error al agregar la categoria: " + JSON.stringify(e);
    });
  }

  async listarCategorias(){
    let query = `SELECT * FROM ${this.tables.tb_categoria} ORDER BY nombre ASC`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return res;
    })
    .catch( (e) => {
      return "Error al listar las categorias: " + JSON.stringify(e);
    });

  }

  async eliminarCategoria(id: number){
    let query = `DELETE FROM ${this.tables.tb_categoria} WHERE id = ${id}`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return "Categoria eliminada";
    })
    .catch( (e) => {
      return "Error al eliminar la categoria: " + JSON.stringify(e);
    });

  }

  async editarCategoria(id: number, nombre: string){
    let query = `UPDATE ${this.tables.tb_categoria} SET nombre = '${nombre}' WHERE id = ${id}`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return "Categoria actualizada";
    })
    .catch( (e) => {

      if(e.code === 6){
        return "Error la categoria ya esta registrada!";
      }

      return "Error al Actualizar la categoria: " + JSON.stringify(e);
    });
  }

  //metodos de contacto
  async insertarContacto( categoria_id: number, nombre: string, telefono:number ){
    let query = `INSERT INTO ${this.tables.tb_contacto} (categoria_id, nombre, telefono) VALUES (${categoria_id}, '${nombre}', ${telefono})`;

    return this.databaseObj.executeSql(query,[])
    .then( () => {
      return "contacto agregado con exito!";
    })
    .catch( (e) =>{
      if(e.code === 6){
        return "Error el contacto ya esta registrado!";
      }
      
      return "Error al agregar el contacto: " + JSON.stringify(e);
    });
  }

  async listarContactos(){
    let query = `SELECT tb_conctacto.id, tb_conctacto.categoria_id, tb_conctacto.nombre, tb_conctacto.telefono as tb_conctacto, tb_categoria.nombre as tb_categoria FROM tb_conctacto INNER JOIN tb_categoria ON tb_categoria.id = tb_conctacto.categoria_id ORDER BY tb_conctacto.nombre ASC`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return res;
    })
    .catch( (e) => {
      return "Error al listar los contacto: " + JSON.stringify(e);
    });

  }

  async eliminarContacto(id: number){
    let query = `DELETE FROM ${this.tables.tb_contacto} WHERE id = ${id}`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return "Contacto eliminado";
    })
    .catch( (e) => {
      return "Error al eliminar el contacto: " + JSON.stringify(e);
    });

  }

  async editarContacto(id: number, categoria_id: number, nombre: string, telefono:number){
    let query = `UPDATE ${this.tables.tb_contacto} SET categoria_id = ${categoria_id},nombre = '${nombre}', telefono = ${telefono}  WHERE id = ${id}`;

    return this.databaseObj.executeSql(query,[])
    .then( (res) =>{
      return "Contacto actualizado";
    })
    .catch( (e) => {

      if(e.code === 6){
        return "Error el contacto ya esta registrado!";
      }

      return "Error al Actualizar el contacto: " + JSON.stringify(e);
    });
  }

}
