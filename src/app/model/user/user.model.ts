import {environment} from "../../../environments/environment";


export class User {

  private _createdOnDate:Date;

  constructor(
    private _userId:number,
    private _userUuid:string,
    private _email: string,
    private _role: string,
    private _name: string,
    private _lastName: string,
    private _avatar: string|null,
    private _isActive:boolean,
    private _createdOn:string
  )
  {
    this._createdOnDate = new Date(this._createdOn);
  }

  get userId(): number {
    return this._userId;
  }

  get userUuid(): string {
    return this._userUuid;
  }

  get email(): string {
    return this._email;
  }

  get role(): string {
    return this._role;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get avatar(): string | null {
    return this._avatar;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdOnDate(): Date {
    return this._createdOnDate;
  }

  get createdOn(): string {
    return this._createdOn;
  }

  getRoleName(): string{
    if(this._role == 'ROLE_ROOT'){
      return "Root";
    }else if(this._role == 'ROLE_ADMIN'){
      return "Admin";
    }else{
      return 'User';
    }
  }

  public getAvatarResource():string
  {
    if( this._avatar ){
      return environment.digital_ocean_storage + this._avatar
    }else{
      return './assets/images/users/user-icon.png'
    }
  }
}


