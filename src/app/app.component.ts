import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder', icon: 'home' },
    { title: 'Contacto', url: '/contacto', icon: 'people' },
    { title: 'Categoria', url: '/categoria', icon: 'pricetags' },
  ];
  constructor() {}
}
