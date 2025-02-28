export class User {
  constructor(
    public name: string,
    public cognitoId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public id?: number
  ) {}
}
