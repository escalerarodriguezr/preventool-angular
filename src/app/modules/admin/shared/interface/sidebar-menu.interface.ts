export interface Submenu {
  title: string;
  url: string;
}

export interface MenuItem{
  title: string,
  icon: string,
  submenu: Submenu[]
}

export interface MenuModule{
  module: string,
  items: MenuItem[]
}

export interface SideBarMenu{
  company: MenuModule,
  users: MenuModule,
}
