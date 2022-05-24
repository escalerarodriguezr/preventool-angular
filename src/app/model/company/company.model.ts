export class Company
{
  constructor(
    private _id:number,
    private _uuid:string,
    private _name:string,
    private _legalDocument:string|null,
    private _address:string|null
  ) {

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

  get legalDocument(): string | null {
    return this._legalDocument;
  }

  get address(): string | null {
    return this._address;
  }
}
