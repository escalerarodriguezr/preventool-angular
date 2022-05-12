export interface GetUserByUuidInterface{
  id:number;
  uuid:string;
  email:string;
  name:string;
  lastName:string;
  avatar:string|null
  role:string;
  isActive:boolean;
  isEmailConfirmed:boolean;
  creatorUuid:string;
  createdOn:string
}
