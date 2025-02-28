export class User {
  constructor(
    public id: number,
    public name: string,
    public cognitoId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
