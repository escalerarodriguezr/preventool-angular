import { Injectable } from '@angular/core';
import {SideBarMenu} from "../../interface/sidebar-menu.interface";
import {SessionService} from "../session/session.service";
import {AuthUser} from "../../../../../model/user/authUser.model";

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


  constructor(
    private sessionService:SessionService
  ) {

  }


  get menu(): any {
    return this.transformMenu();
  }

  private transformMenu():object
  {
    let transformedMenu = Object.assign({}, this._menu)
    if( this.sessionService.authUser?.role === 'ROLE_ADMIN' ){
      // @ts-ignore
      transformedMenu.users.items[0].submenu.splice(1,1)
    }
    
    return transformedMenu;
  }
}
