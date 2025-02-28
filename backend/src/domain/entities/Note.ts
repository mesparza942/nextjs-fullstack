export class Note {
  constructor(
    public title: string,
    public content: string,
    public userId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public id?: number
  ) {}
}
