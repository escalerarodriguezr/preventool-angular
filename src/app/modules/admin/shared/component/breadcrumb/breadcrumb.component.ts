import { Component, OnInit } from '@angular/core';
import {filter, Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})


export class BreadcrumbComponent implements OnInit {

  public breadCrumbs$: Subscription;
  private breadCrumbsMap:any = {
    //Dashboard
    '/admin/dashboard': [
      {
        pageTitle: 'Dashboard',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
    ],

    //Users
    '/admin/user/users': [
      {
        pageTitle: 'Listado de usuarios',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
      {
        title: 'Listado Usuarios',
        url: '/admin/user/users',
        navigate: true
      }
    ],
    '/admin/user/create': [
      {
        pageTitle: 'Crear usuario',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
      {
        title: 'Crear usuario',
        url: '/admin/user/create',
        navigate: true
      }
    ],

    '/admin/user/edit': [
      {
        pageTitle: 'Editar usuario',
        title: 'Listado de Usuarios',
        url: '/admin/user/users',
        navigate: true
      },
      {
        title: 'Editar usuario',
        url: '#',
        navigate:false
      }
    ],

    //Company
    '/admin/company/edit': [
      {
        pageTitle: 'Datos empresa',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
      {
        title: 'Datos empresa',
        url: '/admin/company/edit',
        navigate: false
      }
    ],

    //Organization
    '/admin/organization/organizations': [
      {
        pageTitle: 'Listado de organizaciones',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
      {
        title: 'Listado Organizaciones',
        url: '/admin/organization/organizations',
        navigate: true
      }
    ],

    '/admin/organization/create': [
      {
        pageTitle: 'Crear organización',
        title: 'Dashboard',
        url: '/admin/dashboard',
        navigate: true
      },
      {
        title: 'Crear organización',
        url: '/admin/organization/create',
        navigate: true
      }
    ],
    '/admin/organization/edit': [
      {
        pageTitle: 'Editar organizacion',
        title: 'Listado de Organizaciones',
        url: '/admin/organization/organizations',
        navigate: true
      },
      {
        title: 'Editar organizacion',
        url: '#',
        navigate:false
      }
    ],

    // 'admin/company/progress': [
    //   {
    //     pageTitle: 'Progreso',
    //     title: 'Dashboard',
    //     url: '/admin/dashboard'
    //   },
    //   {
    //     title: 'Progreso',
    //     url: 'admin/company/progress'
    //   }
    // ],

  };

  public currentBreadCrumbs = [];

  constructor(
    private router: Router,
  ) {

    this.breadCrumbs$ = this.router.events
      .pipe(
        filter( event => event instanceof NavigationEnd ),
      )
      .subscribe((res )=>{
        const navigationEnd = res as NavigationEnd;
        this.currentBreadCrumbs = this.breadCrumbsMap[this.tranformPath(navigationEnd.urlAfterRedirects)];
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.breadCrumbs$.unsubscribe();
  }

  private tranformPath(path:string):string {
    if (path.includes('/admin/user/edit')) {
      return '/admin/user/edit';
    }
    if (path.includes('/admin/organization/edit')) {
      return '/admin/organization/edit';
    }
    return path;
  }

}
