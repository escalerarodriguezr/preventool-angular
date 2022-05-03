export class AuthUser {

  constructor(
    private _userUuid:string,
    private _email: string,
    private _role: string,
    private _name: string,
    private _lastname: string,
  )
  {
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

  get lastname(): string {
    return this._lastname;
  }
}


