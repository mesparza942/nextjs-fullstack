export class Note {
  constructor(
    public title: string,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date,
    public userId: number, // relation to User table
    public id?: number
  ) {}
}
