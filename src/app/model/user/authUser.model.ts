export class AuthUser {

  constructor(
    private _userId:string,
    private _email: string,
    private _role: string,
    private _name: string,
    private _surname: string,
  )
  {
  }


  get userId(): string {
    return this._userId;
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

  get surname(): string {
    return this._surname;
  }
}


