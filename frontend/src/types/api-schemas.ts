export interface User {
  id: number;
  name: string;
  cognitoId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateUserBody {
  name: string;
}
