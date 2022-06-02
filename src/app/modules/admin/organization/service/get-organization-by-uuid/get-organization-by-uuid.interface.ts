export interface GetOrganizationByUuidInterface{
  id:number;
  uuid:string;
  email:string;
  name:string;
  legalDocument:string|null;
  address:string|null;
  isActive:boolean;
  createdOn:string;
}
