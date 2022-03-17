export interface UserInterface{
  id:string;
  email:string;
  role:string;
  name:string;
  surname:string;
  isEmailConfirmed:boolean;
  isActive:boolean;
  creatorId:string;
  updaterId:string
  createdOn:string
  updatedOn:string
}

export interface SearchUserInterface {
  total: number;
  pages: number;
  currentPage:number;
  users:UserInterface[];
}
