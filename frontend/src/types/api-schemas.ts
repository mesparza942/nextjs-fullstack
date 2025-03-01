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

export interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteBody {
  title: string;
  content: string;
}

export interface EditNoteBody extends CreateNoteBody {
  id: number;
}
