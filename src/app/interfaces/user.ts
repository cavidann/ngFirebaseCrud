
interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  $key?: string;
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: string;
  phone?: string;
  website?: string;
  company?: ICompany;
}
