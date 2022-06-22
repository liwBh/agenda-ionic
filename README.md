# Proyecto de Agenda en Ionic
Por: liwBH, 2022

### Requerimientos Previos

* *Descarga y instalar node js*

* *Instalar ionic* 
```
npm install -g @ionic/cli
```

* *Instalar angular* 
```
npm install -g @angular/cli
```

* *Instalar gradle*  "EL MISMO DE ANDROID STUDIO" [Video tutorial](https://nodejs.org/es/)


#### Configuracion de variables de entorno

##### Variables Nuevas
* ANDROID_HOME : C:\Users\liwba\.android
* ANDROID_SDK_ROOT : C:\Users\liwba\AppData\Local\Android\Sdk
* JAVA_HOME : C:\Program Files\Java\jdk1.8.0_202

##### Editar Path - nuevo
* C:\Users\liwba\AppData\Local\Android\Sdk\platform-tools
* C:\gradle\gradle-7.4\bin

##### Reiniciar pc

#### Habilitar scripts en consola vscode   
- [Video tutorial](https://youtu.be/bSe2txn_NuQ)

* Abrir powershell como administrador 
comando: 
```
set-ExecutionPolicy Unrestricte
```
* Aceptar: S


#### Primer Proyecto en Ionic

* Instalar cordova -> npm install -g cordova
```
npm install -g cordova
```

* Abrir cmd y ubicar la carpeta de trabajo

* Crear proyecto
```
Ionic start {nombre} --cordova
```
 
* legir Framework: Angular

* Elegir Plantilla: blank

* confirmar utilizar cordova: Y

* No crear cuenta ionic: n

* Abrir ruta de proyecto
```
cd {nombre proyecto}
```

#### Instalar Sqlite

comando 0:  Habilita el uso de ionic capacitor {funcion}
```
 npm install @capacitor/android 
```

comando 1: Dependencias para Sqlite
```
ionic cordova plugin add cordova-sqlite-storage
```

comando 2:  Dependencias para Sqlite
```
npm install cordova-sqlite-storage
```

comando 3: Dependencias para Sqlite
```
npm install @ionic-native/core
```

comando 4: Dependencias para Sqlite
```
npm install @ionic-native/sqlite
```

comando 5: Sincronizar dependencias instaladas
```
ionic capacitor sync
```


#### Desarrollar app 

1. Crear paginas que se necesitan
```
ionic generate page {nombre pagina}
```

2. Añadir las paginas agregadas a app.components.ts

3. Diseñar interfaz de las paginas

- [Documentacion](https://ionicframework.com/docs)

- [Icons](https://ionic.io/ionicons)

- [Components](https://ionicframework.com/docs/components)

- [CSS componentes](https://ionicframework.com/docs/v1/components/)

- [Structure ionic](https://ionicframework.com/docs/layout/structure)

- [Input ionic](https://ionicframework.com/docs/api/input)


4. Añadir sqlite a app.module.ts
```
import { SQLite } from '@ionic-native/sqlite/ngx';

  providers: [
    SQLite,
    .....
  ]
```

5. Crear databaseService
```
ionic generate service database
```

6. Crear base de datos y tablas
Archivo: database.service.ts

7. Utilizar las funciones del crud creadas en 
Archivo: database.service.ts

En las paginas que contenga el crud
Archivo: {nombre pagina}.page.ts


#### Prepara proyecto para usar en android

- comando 0: Habilita el uso de ionic capacitor {funcion}
```
npm install @capacitor/android
```

- comando 1: Genera archivos de modo producion 
```
ionic build
```

- comando 2: Genera carpeta android en el proyecto
```
ionic capacitor add android 
```

- comando 3: Abrir en android
```
ionic capacitor open android 
```

*En caso de querer usar emulador externo deberia parecer un mensaje con una lista de emuladores disponibles
Si utiliza este comando no es necesario usar comando 3
Requiere tener el emulador de anroid encendido o el emulador a usar o conectar el celular
si no funciona correctamente usar comando 3*

comando 4: -> usar solo emulador 
```
ionic capacitor run android --livereload --external 
```

##### Agilizar uso de comando 
Archivo: package.json

Añadir scripts:
```
 	"open": "ionic capacitor open android"
	"add": "ionic capacitor add android"
	"up": "ionic capacitor sync"
```

Ejecutar: 
```
	npm run open
	npm run add
	npm run up
```

##### Luego de modificar el proyecto 

* Opcion 1 "Recomendada"
Sincronizar modificaciones en archivos
```
ionic capacitor sync
```

 Solo necesario para abrir proyecto
```
ionic capacitor open android
```

En Android studio build -> clean proyect
Ejecutar emulador  Android studio



* Opcion 2
Eliminar carpeta de android del proyecto
 
Genera carpeta android en el proyecto
 ```
 ionic capacitor add android 
 ```
Genera archivos de modo producion
 ```
  ionic build 
 ```
Solo necesario para abrir proyecto
 ```
  ionic capacitor open android
 ```
 
En Android studio build -> clean proyect
Ejecutar emulador  Android studio
 

##### *Notas*

- *La propiedad [fullscreen]="false" en contenedores ionic afecta la visualizacion en android.*

- *En android estudio se ejecuta el emulador click sobre la pestaña del emulador selecionar view mode (float, window).*

- *Paquete del proyecto: io.ionic.starter -> En el divece android -> Aca se generada la base sqlite.*


### Imagenes de la interfaz del Proyecto

##### Menu
![Menu](https://user-images.githubusercontent.com/68663454/169888762-be2c7d6d-7ca4-448f-b6ac-5092f28257ef.png)

##### Pagina de Inicio
![Inicio](https://user-images.githubusercontent.com/68663454/169888918-e90ad637-0e4e-4fe1-8220-81ded00f4d46.png)

##### Pagina de contactos
![image](https://user-images.githubusercontent.com/68663454/169889006-001e7f35-0136-473b-9d4d-175093294404.png)

##### Pagina de categorias
![image](https://user-images.githubusercontent.com/68663454/169889197-1f2c6c1d-a494-4715-9f40-8ea837a9c036.png)

##### Aciones Editar y Eliminar
![image](https://user-images.githubusercontent.com/68663454/169889243-b817ad9e-5d0d-4b8a-9e8a-c33a9fcce70d.png)

![image](https://user-images.githubusercontent.com/68663454/169889305-68aa480d-c65c-49f8-8154-1538612aa9fa.png)


### Error 

1) Al abrir el proyecto en android studio 

Mensaje: By Caused: org.gradle.api.internal.plugins.PluginApplicationException: Apply to the Failed plugin [ID 'com.android.internal.application'] gradle.properties in Gradle.Scripts is
added

#### solución 
![image](https://user-images.githubusercontent.com/68663454/174694649-e77f3bf7-e550-4774-bf86-89f803d1bb70.png)

#### Agregar en ese archivo esta linea de codigo: 
 ```
android.overridePathCheck=true
 ```

##### Fuente:  [Blog](https://blog.katastros.com/a?ID=01800-3b28a35d-6268-4723-baae-32bf98ec70fd)

## IONIC WEB SERVICE  

##### [Tutorial Base](https://youtu.be/bqiHfIBh8Xk)

#### Navegacion entre paginas, se debe agregar a cada pagina el sigueinte codigo:


##### Nota: 
"Sin el uso adecuado de navegacion puede no ejecutar el contructor ni ngOnInit de la pagina y no realizar la ejecucion de metodos."

* inicio de pagina archivo {nombre pagina}.page.ts
```
import { NavController } from '@ionic/angular';
 ```
 
 * Constructor archivo {nombre pagina}.page.ts
```
  constructor( 
    public apiService : ApiService,
    public toastController: ToastController, 
    public navCtrl: NavController
    ) {

  }
 ```
 
 * metodo archivo {nombre pagina}.page.ts
```
  redirecionar(){
    this.navCtrl.navigateRoot('/{nombre pagina}');
  }
 ```
 
  * botón archivo {nombre pagina}.page.html
```
  <ion-button color="success" size="small"  (click)="redirecionar()">
    Nuevo
  </ion-button>
 ```
 
 #### Guia del uso de Grid layout en Ionic
 * [Tutorial](https://ionicframework.com/docs/api/grid)

#### Habilitar uso de Cors 

* En web service PHP: [Tutorial](https://victorroblesweb.es/2017/04/23/cabeceras-http-php-permitir-acceso-cors/)

```
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
```

* En Ionic proyecto: archivo creado para el servicio de api
```
ionic generate service api
```

```
import { HttpClient, HttpHeaders } from '@angular/common/http';
```

```
  headers: HttpHeaders;
```

```
  constructor( public http: HttpClient ) { 
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Access-Control-Allow-Origin", '*');
  }
```

* Agregar modulo http en archivo: app-module.ts
```
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
```

 #### Tutorial pasar un objeto de una pagina a otra
 
 ##### Nota: 
* " No usar la navegacion que usan en el video para paginas puede dar problemas de actualizacion de datos "
* " Utilizar el mismo archivo generado para los servicios de api "

```
import { BehaviorSubject } from 'rxjs';
```

```
  private objectsource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectsource.asObservable();
   objeto: any = {};
```

```
  sendObjectSource( vehiculo: any ){
    this.objectsource.next( vehiculo );
  }
```

```
    this.apiService.$getObjectSource.subscribe( (data) => {
      this.objeto = data;
    });
```
