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
            {title: 'Progress', url: '/admin/company/progress'},
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
            {title: 'Listado de usuarios', url: '/admin/user/users'},
            {title: 'Crear usuario', url: '/admin/user/create'},
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
