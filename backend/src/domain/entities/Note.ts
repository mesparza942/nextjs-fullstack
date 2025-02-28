export class Note {
  constructor(
    public title: string,
    public content: string,
    public userId: number, // relation to User table
    public createdAt: Date,
    public updatedAt: Date,
    public id?: number
  ) {}
}
