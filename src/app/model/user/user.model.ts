export class User {
  constructor(
    private _userId:number,
    private _userUuid:string,
    private _email: string,
    private _role: string,
    private _name: string,
    private _lastName: string,
  )
  {
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

  getRoleName(): string{
    if(this._role == 'ROLE_ROOT'){
      return "Root";
    }else if(this._role == 'ROLE_ADMIN'){
      return "Admin";
    }else{
      return 'User';
    }
  }
}


