export interface GetUserByUuidInterface{
  id:number;
  uuid:string;
  email:string;
  name:string;
  lastName:string;
  role:string;
  isActive:boolean;
  isEmailConfirmed:boolean;
  creatorUuid:string;
  createdOn:string
}
