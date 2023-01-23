export interface IUser {
  data: IUserProfile[];
}

export interface IUserProfile {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  picture: string;
  location: [];
}

interface IGetUsers {
  (): Promise<IUser>;
}

export const getUsers: IGetUsers = async () => {
  const requestOptions = {
    headers: { 'app-id': '63cd835711c81eccd41e321d' },
  };
  const response = await fetch(
    'https://dummyapi.io/data/v1/user',
    requestOptions
  );
  const users = (await response.json()) as IUser;
  return users;
};
