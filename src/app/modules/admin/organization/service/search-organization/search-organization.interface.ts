export interface OrganizationInterface{
  id:number;
  uuid:string;
  email:string;
  name:string;
  legalDocument:string|null;
  address:string|null;
  isActive:boolean;
  createdOn:string
  updatedOn:string
}

export interface SearchOrganizationInterface {
  total: number;
  pages: number;
  currentPage:number;
  items:OrganizationInterface[];
}
