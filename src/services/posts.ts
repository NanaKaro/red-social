export interface IPosts {
  data: IPost[];
}

export interface IOwner {
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

export interface IPost {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: IOwner;
  comments?: number;
}

interface IGetPosts {
  (): Promise<IPosts>;
}

export const getPosts: IGetPosts = async () => {
  const requestOptions = {
    headers: { 'app-id': '63cd835711c81eccd41e321d' },
  };
  const response = await fetch(
    'https://dummyapi.io/data/v1/post',
    requestOptions
  );
  const posts = (await response.json()) as IPosts;
  return posts;
};
