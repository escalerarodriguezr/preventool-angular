import { Injectable } from '@angular/core';
import {SideBarMenu} from "../../interface/sidebar-menu.interface";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _menu:SideBarMenu = {

    company:{
      module:"Modulo Empresa",
      items:[
        {
          title: 'Compañia',
          icon: 'mdi mdi-gauge',
          submenu: [
            {title: 'Datos generales', url: '/admin/company/update'},
            {title: 'Progress', url: 'progress'},
          ]
        }
      ]
    },
    users:{
      module:'Users',
      items:[
        {
          title: 'Usuarios',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            {title: 'Dashboard', url: '/'},
            {title: 'Progress', url: 'progress'},
            {title: 'Gráfica1', url: 'grafica1'},
            {title: 'Promesas', url: 'promesas'},
            {title: 'Rxjs', url: 'rxjs'},
          ]
        }
      ]

    }
  }


  constructor() { }


  get menu(): any {
    return this._menu;
  }
}
