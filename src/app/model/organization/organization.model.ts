export class Organization{

  private _createdOnDate:Date

  constructor(
    private _id:number,
    private _uuid:string,
    private _name:string,
    private _email:string,
    private _isActive:boolean,
    private _createdOn:string,
    private _legalDocument:string|null,
    private _address:string|null
  )
  {
    this._createdOnDate = new Date(this._createdOn);
  }


  get id(): number {
    return this._id;
  }

  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdOn(): string {
    return this._createdOn;
  }

  get legalDocument(): string | null {
    return this._legalDocument;
  }

  get address(): string | null {
    return this._address;
  }

  get createdOnDate(): Date {
    return this._createdOnDate;
  }
}
