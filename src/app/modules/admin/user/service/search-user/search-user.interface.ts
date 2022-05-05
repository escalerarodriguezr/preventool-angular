export interface UserInterface{
  id:number;
  uuid:string;
  email:string;
  name:string;
  lastName:string;
  role:string;
  isActive:boolean;
  isEmailConfirmed:boolean;
  creatorUuid:string;
  updaterId:string
  createdOn:string
  updatedOn:string
}

export interface SearchUserInterface {
  total: number;
  pages: number;
  currentPage:number;
  items:UserInterface[];
}
